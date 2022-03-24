import React from "react";
import styled from "styled-components";

export type TextInputParams = {
  label: string | null;
  name: string;
  value: string;
  callback: any;
  style: any;
  labelStyle: any;
  placeholderText: string;
  isRequired: boolean;
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextInput = ({
  label,
  name,
  value,
  callback,
  style,
  labelStyle,
  placeholderText,
  isRequired,
}: TextInputParams) => {
  return (
    <InputContainer>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        name={name}
        style={style}
        placeholder={placeholderText}
        onChange={callback}
        value={value}
        required={isRequired ? true : false}
      />
    </InputContainer>
  );
};
