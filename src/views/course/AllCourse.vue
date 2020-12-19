<template>
  <div>
    <el-row class="toolbar">
      <el-col :span="12">
        <span class="area-title">所有课程</span>
      </el-col>
      <el-col :span="6">
        <el-button
          v-if="user.userType === 1"
          class="add-course"
          type="primary"
          @click="addCourseDialogVis = true"
        >添加课程</el-button>
      </el-col>
      <el-col :span="6" :offset="user.userType === 1 ? 0 : 6">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="search"
        ></el-input>
      </el-col>
    </el-row>

    <el-dialog
      v-if="user.userType === 1"
      title="添加课程"
      :visible.sync="addCourseDialogVis"
      @close="dialogClose"
    >
      <el-row type="flex" justify="center">
        <el-col :xs="16" :sm="14" :md="12" :lg="10" :xl="8">
          <el-form
            ref="addCourse"
            label-position="top"
            label-width="100px"
            :model="newCourse"
            status-icon
            :rules="formRules"
          >
            <el-form-item
              class="form-item"
              label="课程名称："
              prop="newCourseName"
            >
              <el-input
                placeholder="请输入课程名称"
                v-model="newCourse.newCourseName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="form-item"
              label="课程封面："
              prop="newCourseCover"
            >
              <el-upload
                accept=".jpg, .png, .jpeg"
                :action="$serverBaseUrl + '/api/addNewCourse'"
                :data="{ newCourseName: newCourse.newCourseName }"
                ref="upload"
                :with-credentials="true"
                :file-list="newCourse.newCourseCover"
                :before-upload="beforeAddNewCourse"
                :on-success="addNewCourseSuccess"
                :on-error="addNewCourseError"
                list-type="picture"
                :auto-upload="false"
                :limit="1"
              >
                <el-button size="small" type="primary">选择封面</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过{{ newCourseCoverMaxSize }}kb
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <div slot="footer">
        <el-button @click="addCourseDialogVis = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addNewCourse"
          :loading="addingNewCourse"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-row v-show="courses.length === 0" class="no-course-box">
      <span class="no-course">暂无课程</span>
    </el-row>
    <el-row :gutter="20">
      <el-col class="course-bar"
              style="width: 260px;"
              v-for="(course, index) in courses"
              :key="index">
        <CourseCard :course="course" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { CoursesProvider } from '@/provider/index'
import CourseCard from '@/components/course/CourseCard';

export default {
  components: {
    CourseCard
  },
  data() {
    return {
      search: '',
      allCourses: [],
      addCourseDialogVis: false,
      formRules: {
        newCourseName: [
          { required: true, message: '请填写课程名称', trigger: 'blur' }
        ],
        newCourseCover: [
          {
            required: true,
            message: '请为该课程选择一个封面',
            trigger: 'change'
          }
        ]
      },
      newCourse: {
        newCourseName: '',
        newCourseCover: []
      },
      newCourseCoverMaxSize: 500,
      addingNewCourse: false
    };
  },
  computed: {
    courses() {
      return this.allCourses.filter(course => {
        const reg = new RegExp(this.search, 'i');
        return reg.test(course.coursename) || reg.test(course.tch[0].username);
      });
    }
  },
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  created() {
    this.getCourses();
  },
  methods: {
    getCourses() {
      CoursesProvider.getCourses()
        .then(res => {
          if (res.data.code === 1) {
            this.allCourses = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    addNewCourseSuccess(response, file, fileList) {
      if (response.code === 1) {
        this.addingNewCourse = false;
        this.addCourseDialogVis = false;
        this.$router.push({ path: '/emptyPage' });
      }
      if (response.code === 0) {
        this.addingNewCourse = false;
        this.$alert(response.info, '添加课程失败', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({ path: '/emptyPage' });
          }
        });
      }
      if (response.code === -1) {
        this.addingNewCourse = false;
        this.$alert('发生了错误导致上传失败', '上传失败', {
          confirmButtonText: '确定'
        });
        console.log(response.errMsg);
      }
    },
    addNewCourseError(err, file, fileList) {
      this.$alert('上传失败，请确认课程信息填写完整', '添加失败', {
        confirmButtonText: '确定'
      });
      console.log(err);
    },
    beforeAddNewCourse(file) {
      // if(typeof file === 'undefined'){
      //   this.$message.error({
      //     message:'请上传课程封面！'
      //   })
      //   return false;
      // }
      if (file.size / 1024 > this.newCourseCoverMaxSize) {
        // 大于对封面大小的限制
        this.$confirm(
          `课程封面图片大小不能超过${this.newCourseCoverMaxSize}KB，请重新选择课程封面`,
          '提示',
          {
            confirmButtonText: '确定',
            type: 'error',
            showCancelButton: false
          }
        );
        this.addingNewCourse = false;
        return false;
      }
      return true;
    },
    addNewCourse() {
      if (!this.newCourse.newCourseName) {
        this.$message.error({
          message:'请填写课程名称！'
        })
      }else {
        this.addingNewCourse = true;
        this.$refs.upload.submit();
      }
    },
    dialogClose() {
      this.$refs.addCourse.resetFields();
      this.addingNewCourse = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  margin-bottom: 30px;

  .area-title {
    line-height: 40px;
    font-size: 1.3rem;
    color: #303133;
  }

  .add-course {
    float: right;
    margin-right: 20px;
  }
}

.no-course-box {
  padding: 5rem;
  text-align: center;
  color: #909090;
}

.course-bar {
  margin-bottom: 30px;
}
</style>
