import Task from './Task';

const tasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Task 2',

    completed: true,
  },
  {
    id: 3,
    title: 'Task 2',
    description: 'Description for Task 2',
    completed: true,
  },
];

const Tasks = () => {
  return (
    <div>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
          />
        );
      })}
    </div>
  );
};

export default Tasks;
