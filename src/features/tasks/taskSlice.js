import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(
    'https://task-list-hw-server-Student-neoG-Ca.replit.app/tasks'
  );

  // console.log(response);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleStatus: (state, action) => {
      // console.log(action.payload);
      const findDate = state.tasks.find(
        (task) => task.date === action.payload.date
      );
      // console.log(current(findDate));
      if (findDate) {
        const task = findDate.tasks.find(
          (task) => task.taskId === action.payload.taskId
        );
        console.log(current(task));

        if (task) {
          task.taskStatus =
            task.taskStatus === 'Pending' ? 'Completed' : 'Pending';
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = 'success';
      state.tasks = action.payload.tasks;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.message;
    });
  },
});

export const { toggleStatus } = taskSlice.actions;

export default taskSlice.reducer;
