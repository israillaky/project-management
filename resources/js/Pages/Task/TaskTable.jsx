import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { Link } from "@inertiajs/react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { router } from "@inertiajs/react";
export default function TaskTable({
  tasks,
  success,
  queryParams = null,
  hideProjectColumn = false,
}) {
  queryParams = queryParams || {};
  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChange(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("task.index"), queryParams);
  };

  const deleteTask = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    router.delete(route("task.destroy", task.id));
  };
  return (
    <>
      {success && (
        <div
          className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          {success}
        </div>
      )}
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>
              <th className="px-3 py-3">Image</th>
              {!hideProjectColumn && (
                <th className="px-3 py-3">Project Name</th>
              )}

              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Name
              </TableHeading>

              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Status
              </TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Due Date
              </TableHeading>
              <th className="px-3 py-3">Created By</th>
              <th className="px-3 py-3 text-right">Action</th>
            </tr>
          </thead>
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-3"> </th>
              <th className="px-3 py-3"> </th>
              {!hideProjectColumn && <th className="px-3 py-3"></th>}
              <th className="px-3 py-3">
                <TextInput
                  className="w-full"
                  placeholder="Task Name"
                  onBlur={(e) => searchFieldChange("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>

              <th className="px-3 py-3">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={(e) => searchFieldChange("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.data.map((task) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={task.id}
              >
                <td className="px-3 py-2">{task.id}</td>
                <td className="px-3 py-2">
                  <img src={task.image_path} style={{ width: 45 }} alt="" />
                </td>

                {!hideProjectColumn && (
                  <td className="px-3 py-2">
                    <span className="bg-gray-400 hover:bg-gray-500 px-2 py-1 rounded text-white text-nowrap">
                      <Link href={route("project.show", task.project.id)}>
                        {task.project.name.length > 20
                          ? `${task.project.name.substring(0, 20)}...`
                          : task.project.name}
                      </Link>
                    </span>
                  </td>
                )}
                <td className="px-3 py-2">
                  <Link href={route("task.show", task.id)}>
                    {task.name.length > 20
                      ? `${task.name.substring(0, 20)}...`
                      : task.name}
                  </Link>
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
                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                <td className="px-3 py-2">{task.createdBy.name}</td>
                <td className="px-3 py-2 text-nowrap">
                  <Link
                    href={route("task.edit", task.id)}
                    className="font-medium text-orange-600 dark:text-orange-500 hover:underline mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                    onClick={(e) => deleteTask(task)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </>
  );
}
