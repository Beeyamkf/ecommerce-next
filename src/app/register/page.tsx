import Card from "@/components/Card";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <Card title="Créer un compte">
        <RegisterForm />
      </Card>
    </div>
  );
}
