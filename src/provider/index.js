
import { UserProvider, StudentProvider, TeacherProvider } from './src/user/index'
import { ResourcesProvider } from './src/resources';
import { CoursesProvider } from './src/courses';
import { ExercisesProvider } from './src/exercises';
import { ExamsProvider } from './src/exams'
import { QaProvider } from './src/qa';
import { ArticleProvider } from './src/article'
import { OthersProvider } from './src/others'

const userProvider = {
  user: UserProvider,
  student: StudentProvider,
  teacher: TeacherProvider
}

export {
  userProvider as UserProvider,
  ResourcesProvider,
  CoursesProvider,
  ExercisesProvider,
  ExamsProvider,
  QaProvider,
  ArticleProvider,
  OthersProvider
}
