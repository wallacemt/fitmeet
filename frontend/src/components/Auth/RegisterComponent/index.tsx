import { useState } from "react";
import { AuthContainer } from "../AuthContainer";
import logo from "@/assets/images/Logo.svg";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import { useRegister } from "@/hooks/useRegister";
import { formatCPF, unformatCPF } from "@/utils/cpfUtilis";

export const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useRegister();

  const onSubmit = form.onSubmit;

  return (
    <AuthContainer className="overflow-hidden ">
      <div className="flex items-start font-secundaria flex-col justify-center h-full gap-4 w-96  text-lg ">
        <img src={logo} alt="Logo do projeto" className="lg:h-fit h-20 lg:self-start self-center mb-6" />

        <h2 className="font-principal uppercase text-3xl lg:self-start self-center">Crie sua conta</h2>

        <p className="lg:text-left text-center">
          Cadastre-se para encontrar parceiros de treino e começar a se exercitar ao ar livre. Vamos juntos! 💪
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:space-y-8 lg:p-0 p-2 space-y-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Nome Completo <span className="text-perigo">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: João Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    CPF <span className="text-perigo">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex.: 123.456.789-01"
                      value={formatCPF(field.value)}
                      onChange={(e) => field.onChange(unformatCPF(e.target.value))}
                      maxLength={14}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    E-mail<span className="text-perigo">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: joao@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg" htmlFor="password">
                    Senha <span className="text-perigo">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ex.: joao123"
                        {...field}
                        id="password"
                      />
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.error && setTimeout(() => form.setError(""), 3000) && (
              <p className="text-perigo text-center text-sm">{form.error}</p>
            )}

            {form.message && setTimeout(() => form.setMessage(""), 6000) && (
              <p className="text-primaria text-center text-sm">{form.message}</p>
            )}

            <Button
              type="submit"
              disabled={form.loading || !form.formState.isValid}
              className="disabled:cursor-not-allowed text-base bg-primaria w-full h-12 mt-4 hover:bg-primaria/80 flex items-center justify-center"
            >
              {form.loading ? (
                <div className="animate-spin h-5 w-5 border-b-2 border-[#F9370B] rounded-full"></div>
              ) : (
                "Cadastrar"
              )}
            </Button>
          </form>
        </Form>
        <p className="text-center self-center">
          Já tem uma conta? {""}{" "}
          <Link to="/" className="font-semibold">
            Faça login
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
};
