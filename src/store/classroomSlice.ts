import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Classroom } from '../types';

interface ClassroomState {
  data: Classroom | null;
}

const initialState: ClassroomState = {
  data: null,
};

const classroomSlice = createSlice({
  name: 'classroom',
  initialState,
  reducers: {
    setClassroomData: (state, action: PayloadAction<Classroom>) => {
      state.data = action.payload;
    },
    updateStudentScore: (state, action: PayloadAction<{ studentId: number; change: number }>) => {
      if (!state.data) return;
      const studentIndex = state.data.students.findIndex(
        (student) => student.id === action.payload.studentId
      );
      if (studentIndex !== -1) {
        state.data.students[studentIndex].score += action.payload.change;
      }
    },
  },
});

export const { setClassroomData, updateStudentScore } = classroomSlice.actions;
export default classroomSlice.reducer;
