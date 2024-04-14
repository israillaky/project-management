import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
export default function Dashboard({
  auth,
  totalPendingTasks,
  myPendingTasks,
  totalProgressTasks,
  myProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-4 ">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              You're logged in!
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 class="text-amber-500 text-2xl font-semibold">
                Pending Task
              </h3>
              <p className="text-lg mt-4">
                <span className="mr-2"> {myPendingTasks}</span> /
                <span className="ml-2">{totalPendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 class="text-blue-500 text-2xl font-semibold">
                In Progress Task
              </h3>
              <p className="text-lg mt-4">
                <span className="mr-2"> {myProgressTasks}</span> /
                <span className="ml-2">{totalProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 class="text-green-500 text-2xl font-semibold">
                Completed Task
              </h3>
              <p className="text-lg mt-4">
                <span className="mr-2"> {myCompletedTasks}</span> /
                <span className="ml-2">{totalCompletedTasks}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 my-4 ">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-gray-200 text-2xl font-semibold">
                My Active Task
              </h3>
              <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Project Name</th>
                    <th className="px-3 py-2">Task Name</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.data.map((task) => (
                    <tr key={task.id}>
                      <td className="px-3 py-2">{task.id}</td>
                      <td className="px-3 py-2">
                        <span className="bg-gray-400 hover:bg-gray-500 px-2 py-1 rounded text-white text-nowrap">
                          <Link href={route("project.show", task.project.id)}>
                            {task.project.name.length > 20
                              ? `${task.project.name.substring(0, 20)}...`
                              : task.project.name}
                          </Link>
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="  text-white text-nowrap">
                          <Link href={route("task.show", task.id)}>
                            {task.name.length > 40
                              ? `${task.name.substring(0, 40)}...`
                              : task.name}
                          </Link>
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-2 py-1 rounded text-white " +
                            TASK_STATUS_CLASS_MAP[task.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2">{task.due_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
