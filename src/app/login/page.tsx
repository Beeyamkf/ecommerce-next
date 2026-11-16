import Card from "@/components/Card";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <Card title="Sign in ">
        <LoginForm />
      </Card>
    </div>
  );
}
