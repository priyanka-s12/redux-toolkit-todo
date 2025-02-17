import { useSelector, useDispatch } from 'react-redux';
import { toggleStatus, fetchTasks } from './taskSlice';
import { useEffect } from 'react';

const Tasks = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => {
    // console.log(state.tasks);
    return state.tasks;
  });

  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  // console.log(tasks);
  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {tasks.tasks.map((task, index) => (
        <div key={index}>
          <h2>{task.date}</h2>
          <ul>
            {task.tasks.map((item) => (
              <li key={item.taskId}>
                <p>
                  {item.task}{' '}
                  <button
                    onClick={() =>
                      dispatch(
                        toggleStatus({ date: task.date, taskId: item.taskId })
                      )
                    }
                  >
                    {item.taskStatus}
                  </button>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
