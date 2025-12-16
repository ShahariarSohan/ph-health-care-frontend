import MyProfile from "@/components/modules/myProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";


export default async function MyProfilePage() {
  const userInfo = await getUserInfo();
  return (
   <MyProfile userInfo={userInfo!}></MyProfile>
  );
}