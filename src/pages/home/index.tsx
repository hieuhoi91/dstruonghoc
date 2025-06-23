import SchoolCard from "./SchoolCard";
import SearchHeader from "./Search";
const schools = [
  {
    id: 1,
    name: "Đại học Bách Khoa Hà Nội",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    majors: ["Công nghệ thông tin", "Điện tử viễn thông", "Cơ khí"],
    acronym: "Hà Nội",
    type: "Công lập",
    typeColor: "bg-blue-600",
    founded: 1956,
    students: 35000,
  },
  {
    id: 2,
    name: "Đại học Quốc gia TP.HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    majors: ["Khoa học máy tính", "Kinh tế", "Sinh học"],
    acronym: "TP.HCM",
    type: "Công lập",
    typeColor: "bg-green-600",
    founded: 1995,
    students: 60000,
  },
  {
    id: 3,
    name: "Đại học FPT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg",
    majors: ["Kỹ thuật phần mềm", "Quản trị kinh doanh", "Thiết kế đồ họa"],
    acronym: "Hà Nội, TP.HCM, Đà Nẵng",
    type: "Tư thục",
    typeColor: "bg-orange-500",
    founded: 2006,
    students: 20000,
  },
  {
    id: 4,
    name: "Đại học Kinh tế Quốc dân",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    majors: ["Kinh tế quốc tế", "Tài chính ngân hàng", "Quản trị nhân lực"],
    acronym: "Hà Nội",
    type: "Công lập",
    typeColor: "bg-yellow-600",
    founded: 1956,
    students: 25000,
  },
  {
    id: 5,
    name: "Đại học Bách Khoa TP.HCM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    majors: ["Cơ điện tử", "Kỹ thuật hóa học", "Kỹ thuật xây dựng"],
    acronym: "TP.HCM",
    type: "Công lập",
    typeColor: "bg-blue-800",
    founded: 1957,
    students: 35000,
  },
  {
    id: 6,
    name: "Đại học Ngoại thương",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    majors: ["Kinh doanh quốc tế", "Luật kinh tế", "Ngôn ngữ Anh"],
    acronym: "Hà Nội, TP.HCM",
    type: "Công lập",
    typeColor: "bg-pink-600",
    founded: 1960,
    students: 15000,
  },
];

const Home = () => {
  return (
    <div className="py-10 px-4 flex flex-col gap-4">
      <SearchHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    </div>
  );
};

export default Home;