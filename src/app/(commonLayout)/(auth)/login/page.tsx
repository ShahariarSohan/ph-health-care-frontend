import LoginForm from "@/components/modules/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) {
  const params = (await searchParams) || {};

  return (
    <div className="flex justify-center my-10">
      {" "}
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm redirect={params?.redirect}></LoginForm>
        </CardContent>
      </Card>
    </div>
  );
}
