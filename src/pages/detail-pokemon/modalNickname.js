/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import Modal from "../../components/modal";
import { getMyPokemon, updateMyPokemon } from "../../utils/myPokemon";
import UUID from "../../utils/uuid";
import { toastSuccess, toastError } from "../../components/toast";

const Index = ({ show, toogle, title, data }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const myPokemon = getMyPokemon().owned_pokemon;
  const [isChecking, setIsChecking] = useState(false);

  const onSubmit = (values) => {
    setIsChecking(true);
    const param = {
      local_id: UUID(),
      ...data,
      ...values,
    };

    let isUnique = myPokemon
      .map(function (e) {
        return e.nickname;
      })
      .indexOf(values.nickname);

    if (isUnique === -1) {
      const savedData = [...myPokemon, param];
      updateMyPokemon(savedData);
      toastSuccess(`${values.nickname} can be seen in My Pokemon `);
      reset();
      toogle(false);
    } else {
      toastError("Nickname already used!");
    }
    setIsChecking(false);
  };

  return (
    <Modal show={show} title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className="mb-3" controlId="formBasicPassword">
          <FormLabel
            css={css`
              font-size: 1rem;
              font-weight: 600;
            `}
          >
            Nickname
          </FormLabel>
          <FormControl
            {...register("nickname", { required: true })}
            type="text"
            placeholder="Insert your pokemon nickname"
            css={css`
              margin-bottom: 12px;
            `}
          />
          {errors.nickname && (
            <span
              css={css`
                color: red;
              `}
            >
              Nickname required
            </span>
          )}
        </FormGroup>

        <div
          css={css`
            width: 100%;
            display: grid;
            margin: 20px auto 0;
            grid-template-columns: 100px 120px;
            grid-gap: 20px;
            justify-content: end;
          `}
        >
          <Button
            type="button"
            variant="outline-danger"
            onClick={() => {
              toogle(false);
              reset();
            }}
            disabled={isChecking}
            data-testid="btnCancelCatchPokemon"
          >
            Release
          </Button>
          <Button
            variant="outline-primary"
            type="submit"
            disabled={isChecking}
            data-testid="btnGiveNicknamePokemon"
          >
            {isChecking && (
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}{" "}
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Index;
