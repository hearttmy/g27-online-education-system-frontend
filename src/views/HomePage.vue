<template>
  <MainLayout class="homepage">
    <el-carousel height="50vh" v-if="courses.length">
      <el-carousel-item v-for="(course, index) in courses"
        :key="index"
        style="cursor:pointer;"
        @click="
          $router.push({
            path: `/course/${course.courseID}/index`
          })
        ">
        <img
            :src="$serverBaseUrl + course.cover"
            :alt="course.coursename"
            :title="course.coursename"
            @click.prevent=""
        />
      </el-carousel-item>
    </el-carousel>

    <el-row type="flex" class="course-list__wrapper" justify="space-between">
      <div
        v-for="(course, index) in courses"
        :key="index"
        class="course-item__wrapper"
        @click="
          $router.push({
            path: `/course/${course.courseID}/index`
          })
        "
      >
        <el-card class="course__item_hottest">
          <div class="course-cover__wrapper">
            <img
              :src="$serverBaseUrl + course.cover"
              :alt="course.coursename"
              :title="course.coursename"
              @click.prevent=""
            />
          </div>
          <div class="course-info__wrapper">
            <!-- <p class="course_tch-name">{{ course.tchID }}</p> -->
            <p :title="course.coursename" class="course_course-name">
              {{ course.coursename }}
            </p>
          </div>
        </el-card>
      </div>
    </el-row>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/common/MainLayout';
import { CoursesProvider } from '@/provider/index';


export default {
  props: {
    user: {
    type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      carouselItems: [],
      courses: [],
    };
  },
  components: {
    MainLayout
  },
  methods: {
    getFourCourses() {
      CoursesProvider.getFourHottestCourses()
        .then(res => {
          if (res.data.code === 1) {
            this.courses = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    }
  },
  created() {
    this.getFourCourses();
  }
};
</script>

<style lang="scss">
img {
  width: 100%;
  height: 100%;
}
.course-list__wrapper {
  margin-top: 16px;
  cursor: pointer;
}

.course__item_hottest {
  > .el-card__body {
    display: flex;
    flex-direction: row;
    padding-right: 0;
  }
}
.course-item__wrapper {
  box-sizing: border-box;
  width: 22%;
}
.course-cover__wrapper {
  padding-right: 12px;
  > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
.course-info__wrapper {
  overflow: hidden;

  > p {
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
}
</style>
