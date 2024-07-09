// CounselorData.ts
export interface Counselor {
  id: string;
  fullName: string;
  position: string;
}

const counselors: Counselor[] = [
  {
    id: "1",
    fullName: "Dr. John Doe",
    position: "Psychologist",
  },
  {
    id: "2",
    fullName: "Ms. Jane Smith",
    position: "Therapist",
  },
  // Add more counselors as needed
];

export default counselors;
