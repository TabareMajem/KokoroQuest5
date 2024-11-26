```typescript
export type Class = {
  id: string;
  name: string;
  grade: string;
  academicYear: string;
  teacherId: string;
  students: Student[];
  schedule: ClassSchedule[];
  createdAt: string;
  updatedAt: string;
};

export type Student = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  parentEmail?: string;
  parentInviteStatus: 'pending' | 'sent' | 'accepted' | 'expired';
  parentInviteSentAt?: string;
  classId: string;
  progress: {
    completedActivities: number;
    totalActivities: number;
    lastActivityDate?: string;
  };
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
};

export type ClassSchedule = {
  id: string;
  classId: string;
  activityType: 'assessment' | 'discussion' | 'exercise';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
  createdAt: string;
  updatedAt: string;
};

export type ParentInvitation = {
  id: string;
  studentId: string;
  email: string;
  status: 'pending' | 'sent' | 'accepted' | 'expired';
  token: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};
```