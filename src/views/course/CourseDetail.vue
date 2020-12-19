<template>
  <div>
    <el-row type="flex" :gutter="20">
      <el-col :span="20">
        <el-row class="header">
          <el-col :span="14" class="course-name">
            <span v-if="courseDetail">{{ courseDetail.coursename }}</span>
          </el-col>
          <el-col class="toolsbar">
            <template
              v-if="user.userType === 1 && user.id === courseDetail.tchID"
            >
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="addChapter = true"
                >新建章节</el-button
              >
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="delCourse"
                >删除课程</el-button
              >
            </template>
            <!-- <el-button
              type="primary"
              size="small"
              icon="el-icon-tickets"
              @click="showBulletins"
              >公告</el-button
            > -->
          </el-col>
        </el-row>
        <el-row
          v-show="!courseDetail.content || courseDetail.content.length === 0"
          class="no-course-content-box"
        >
          <span class="no-course-content">暂无课程内容</span>
        </el-row>
        <el-row>
          <el-timeline>
            <el-timeline-item
              :timestamp="ch.stamp"
              placement="top"
              size="large"
              v-for="ch in courseDetail.content"
              :key="ch.id"
            >
              <el-card
                shadow="always"
                class="course-ch"
                v-for="part in ch.part"
                :key="part.id"
              >
                <el-row>
                  <el-col :span="18" class="title">
                    <span
                      class="part-title"
                      @click="
                        $router.push({
                          path: `${$route.path}/pd?c=${ch.id}&p=${part.id}`
                        })
                      "
                      >{{ part.title }}</span
                    >
                    <el-tag
                      type="success"
                      size="small"
                      class="last-read"
                      v-if="lastread[0] === ch.id && lastread[1] === part.id"
                      >上次看到这里</el-tag
                    >
                  </el-col>
                  <el-col
                    v-if="user.userType === 1 && user.id === courseDetail.tchID"
                    :span="6"
                    class="control"
                  >
                    <el-button
                      type="text"
                      @click="
                        $router.push({
                          path: `${$route.path}/editCourse?id=${courseID}&c=${ch.id}&p=${part.id}`
                        })
                      "
                      >编辑</el-button
                    >
                    <el-button type="text" @click="delPart(ch.id, part.id)"
                      >删除</el-button
                    >
                  </el-col>
                </el-row>
              </el-card>
              <el-row
                class="ch-control"
                v-if="user.userType === 1 && user.id === courseDetail.tchID"
              >
                <el-button
                  plain
                  icon="el-icon-edit"
                  size="small"
                  @click="
                    $router.push({
                      path: `${$route.path}/editCourse?id=${courseID}&c=${
                        ch.id
                      }&p=${getMaxPartID(ch.part) + 1}`
                    })
                  "
                  >新增单元</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="delChapter(ch.id)"
                  >删除章节</el-button
                >
              </el-row>
            </el-timeline-item>
          </el-timeline>
        </el-row>
      </el-col>
      <el-col :span="4">
        <TeacherCard :tch="courseDetail.tch ? courseDetail.tch[0] : {}" />

        <StudentsCard :stus="courseDetail.stus" />
      </el-col>

      <el-dialog
        v-if="user.userType === 1 && user.id === courseDetail.tchID"
        title="添加章节"
        :visible.sync="addChapter"
        width="30%"
        :before-close="handleAddChapterClose"
      >
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-form
              label-position="top"
              label-width="80px"
              :model="newChapter"
              status-icon
              ref="addChapter"
              :rules="newChapterFormRules"
            >
              <el-form-item label="章节名称：" prop="stamp">
                <el-input v-model="newChapter.stamp"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <span slot="footer">
          <el-button @click="addChapter = false">取 消</el-button>
          <el-button type="primary" @click="addChapterToCourse"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import {CoursesProvider} from '@/provider/index';
import TeacherCard from '@/components/course/TeacherCard';
import StudentsCard from '@/components/course/StudentsCard';
import TheBaseNavSideBar from '@/components/course/BaseNavSideBar';

export default {
  data() {
    return {
      // courseID: '',
      courseDetail: {},
      newChapterFormRules: {
        stamp: [{required: true, message: '请输入章节名称', trigger: 'blur'}]
      },
      // newBulletinRules: {
      //   content: [
      //     { required: true, message: '请输入公告内容', trigger: 'blur' }
      //   ]
      // },
      // newBulletin: {
      //   content: ''
      // },
      // isBulletinShow: false,
      // activeBulletinNames: [0],
      newChapter: {
        stamp: '',
        part: []
      },

      addChapter: false,
      lastread: []
    };
  },
  props: {
    courseID: String,
    user: {
      type: Object,
      default: {}
    }
  },
  created() {
    // this.courseID = this.$route.params.course_id;
    this.getCourseDetail();
  },
  methods: {
    getMaxPartID(part) {
      let ids = [];
      part.forEach(p => {
        ids.push(p.id);
      });
      if (ids.length === 0) {
        return -1;
      }
      return Math.max(...ids);
    },
    getMaxChapterID() {
      let ids = [];
      this.courseDetail.content.forEach(c => {
        ids.push(c.id);
      });
      if (ids.length === 0) {
        return -1;
      }
      return Math.max(...ids);
    },
    getCourseDetail() {
      CoursesProvider.getCourseDetail({
        courseID: this.courseID
      })
        .then(res => {
          if (res.data.code === 1) {
            res.data.data.bulletins = [];
            this.courseDetail = res.data.data;
            const lastread = JSON.parse(
              window.localStorage.getItem(
                `course.${this.courseID}.${this.user.id}.lastread.part`
              )
            );
            if (lastread) {
              this.lastread = lastread;
            }
          }
          if (res.data.code === -1) {
            this.$message.error('加载失败');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addChapterToCourse() {
      CoursesProvider.addChapter({
        courseID: this.courseID,
        tchID: this.courseDetail.tchID,
        newChapter: {
          id: this.getMaxChapterID() + 1,
          stamp: this.newChapter.stamp,
          part: this.newChapter.part
        }
      })
        .then(res => {
          if (res.data.code === 1) {
            this.addChapter = false;
            this.$router.push({path: '/emptyPage'});
          }
          if (res.data.code === 0) {
            this.$message({
              message: res.data.info,
              type: 'warning'
            });
          }
          if (res.data.code === -1) {
            this.$alert('发生了错误导致章节添加失败', '添加失败', {
              confirmButtonText: '确定'
            });
            console.log(res.data.errMsg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    delCourse() {
      this.$confirm('此操作将删除该课程及其所有内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          CoursesProvider.delCourse({
            courseID: this.courseID,
            tchID: this.courseDetail.tchID
          })
            .then(res => {
              if (res.data.code === 1) {
                this.$router.push({path: '/emptyPage'});
              }
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.info,
                  type: 'warning'
                });
              }
              if (res.data.code === -1) {
                this.$alert('发生了错误导致课程删除失败', '删除失败', {
                  confirmButtonText: '确定'
                });
                console.log(res.data.errMsg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    delChapter(chapter) {
      this.$confirm('此操作将删除该章节, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          CoursesProvider.delChapter({
            courseID: this.courseID,
            tchID: this.courseDetail.tchID,
            chapter
          })
            .then(res => {
              if (res.data.code === 1) {
                this.$router.push({path: '/emptyPage'});
              }
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.info,
                  type: 'warning'
                });
              }
              if (res.data.code === -1) {
                this.$alert('发生了错误导致删除失败', '删除失败', {
                  confirmButtonText: '确定'
                });
                console.log(res.data.errMsg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    delPart(chapter, part) {
      this.$confirm('此操作将删除该单元, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          CoursesProvider.delPart({
            courseID: this.courseID,
            tchID: this.courseDetail.tchID,
            chapter,
            part
          })
            .then(res => {
              if (res.data.code === 1) {
                this.$router.push({path: '/emptyPage'});
              }
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.info,
                  type: 'warning'
                });
              }
              if (res.data.code === -1) {
                this.$alert('发生了错误导致删除失败', '删除失败', {
                  confirmButtonText: '确定'
                });
                console.log(res.data.errMsg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    handleAddChapterClose() {
      this.$refs.addChapter.resetFields();
      this.addChapter = false;
    }
  },
  components: {
    TeacherCard,
    StudentsCard,
    TheBaseNavSideBar
  }
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 30px;

  .course-name {
    line-height: 40px;
    font-size: 1.5rem;
  }
  .toolsbar {
    line-height: 40px;
    text-align: right;
  }
}

.no-course-content-box {
  padding: 5rem;
  text-align: center;
  color: #909090;
}

.course-ch {
  margin-bottom: 10px;

  .title {
    line-height: 40px;
    font-size: 1rem;

    .part-title {
      cursor: pointer;
    }

    .last-read {
      margin-left: 20px;
    }
  }

  .control {
    text-align: right;
  }
}

.ch-control {
  margin: 20px 0;
}

.bulletins {
  padding: 1rem 0;

  .bulletin-content {
    white-space: pre;
  }
}
</style>
