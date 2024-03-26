import React, { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../hocs/ThemeContext";
import styled from "styled-components";
import { FaRegSave } from "react-icons/fa";
import { useForm } from "react-hook-form";

const FormC = ({ dataRef }) => {
  const { data, setData } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data.name,
      surname: data.surname,
      email: data.email,
    },
  });
  const handleSubmitData = (newData) => {
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData);
  };

  return (
    <UserProfileContainer ref={dataRef}>
      <Title>Профиль</Title>
      <FormContainer onSubmit={handleSubmit(handleSubmitData)}>
        <Field>
          <Label>Имя</Label>
          <MInput
            {...register("name", { required: "Имя обязательное поле!" })}
            placeholder="Ваше имя"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </Field>
        <Field>
          <Label>Фамилия</Label>
          <MInput
            {...register("surname", { required: "Фамилия обязательное поле!" })}
            placeholder="Ваша фамилия"
          />
          {errors.surname && (
            <ErrorMessage>{errors.surname.message}</ErrorMessage>
          )}
        </Field>
        <Field>
          <Label>Почта</Label>
          <MInput
            {...register("email", { required: "Почта обязательное поле!" })}
            placeholder="Ваша почта"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Field>
        <MButton type="submit">
          <FaRegSave size={25} />
          Сохранить
        </MButton>
      </FormContainer>
    </UserProfileContainer>
  );
};

export default FormC;

const UserProfileContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 5rem;
  text-align: center;
  padding: 0.8rem 0.5rem;
  border: 1px solid var(--grey);
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  background-color: var(--bg-dark);
  z-index: 9999;
`;

const FormContainer = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  align-items: center;
`;

const Field = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 1.5rem;
  color: var(--text-light);
  font-weight: 500;
  text-align: left;
`;

const MInput = styled.input`
  padding: 0.8rem 0.5rem;
  height: 2rem;
  border: 1px solid var(--grey);
  border-radius: 5px;
  font-size: 1.5rem;
  background-color: var(--bg-light);
  color: var(--text-light);
  font-weight: 400;
  outline: none;
`;

export const MButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  gap: 3px;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.3rem 0.5rem;
  font-size: 1rem;
  border: 1px solid var(--grey);
  border-radius: 5px;
  background-color: var(--btn-color);
  color: var(--btn-text);
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  position: absolute;
  top: 22px;
  right: 0;
  padding: 0.1rem 0.5rem;
  color: red;
  background-color: var(--bg-light);
  border-radius: 5px;
  border-bottom: 1px solid var(--grey);
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 1.8rem;
  padding: 4rem 0;
  color: var(--text-light);
`;
