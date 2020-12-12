import React, { useRef, useCallback } from "react";
import logo from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { useAuth } from '../../hooks/Auth'
import { useToast } from '../../hooks/Toast'
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import getValidationErrors from "../../utils/getValidationErrors";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Container, Background, Content } from "./styles";

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatória")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

       signIn();
       addToast()
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
      //disparar um toast

    }
  }, [signIn, addToast]);

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login">
          <FiLogIn />
          Criar Conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
