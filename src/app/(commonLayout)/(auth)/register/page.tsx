
 import RegisterForm from "@/components/modules/auth/RegisterForm";

    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from "@/components/ui/card"
   

export default function RegisterPage() {
    return (
      <div className="flex justify-center my-10">
        {" "}
        <Card className="w-full max-w-sm ">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Register your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm></RegisterForm>
          </CardContent>
        </Card>
      </div>
    );
}