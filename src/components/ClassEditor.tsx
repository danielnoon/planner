import produce from "immer";
import { FC, FormEvent, useEffect, useState } from "react";
import Select from "react-select";
import { $classes } from "../state/classSelectors";
import useStore from "../state/store";
import Class, { ClassStatus } from "../types/Class";
import { termMappings } from "./ClassList";
import Modal from "./Modal";
import Flex from "./primitives/Flex";
import Input from "./primitives/Input";
import SelectWrapper from "./primitives/SelectWrapper";

interface ClassEditorProps {
  open: boolean;
  c: Class;
  onCancel: () => void;
  onSubmit: (c: Class) => void;
}

const ClassEditor: FC<ClassEditorProps> = ({
  open,
  c: cls,
  onCancel,
  onSubmit,
}) => {
  const [c, setC] = useState(cls);
  const classes = useStore($classes());

  const terms = termMappings
    .semester(2019)
    .map((t, o) => ({ value: o, label: t }));

  const statuses = [
    { value: ClassStatus.NotStarted, label: "Not Started" },
    { value: ClassStatus.InProgress, label: "In Progress" },
    { value: ClassStatus.Complete, label: "Complete" },
  ];

  useEffect(() => {
    setC(cls);
  }, [cls]);

  function setCode(code: string) {
    setC(
      produce(c, (cc) => {
        cc.code = code;
      })
    );
  }

  function setName(name: string) {
    setC(
      produce(c, (cc) => {
        cc.name = name;
      })
    );
  }

  function setCredits(credits: string) {
    setC(
      produce(c, (cc) => {
        cc.credits = parseInt(credits, 10);
      })
    );
  }

  function setTerm(term: number) {
    setC(
      produce(c, (cc) => {
        cc.term = term;
      })
    );
  }

  function setStatus(status: ClassStatus) {
    setC(
      produce(c, (cc) => {
        cc.status = status;
      })
    );
  }

  function setPrereqAllOf(ids: number[]) {
    setC(
      produce(c, (cc) => {
        cc.prereqs.allOf = ids;
      })
    );
  }

  function setPrereqAnyOf(ids: number[]) {
    setC(
      produce(c, (cc) => {
        cc.prereqs.anyOf = ids;
      })
    );
  }

  function submit(ev: FormEvent) {
    ev.preventDefault();
    onSubmit(c);
  }

  return (
    <Modal onClose={onCancel} open={open}>
      <h1>{c.name || "Class"}</h1>
      <form onSubmit={submit}>
        <Flex direction="column" rowGap={12}>
          <Flex direction="row">
            <Input
              stretch
              autoFocus
              value={c.name}
              onChange={(ev) => setName(ev.target.value)}
              label="Class Name"
              required
            />
          </Flex>
          <Flex direction="row" columnGap={12}>
            <Input
              stretch
              value={c.code}
              onChange={(ev) => setCode(ev.target.value)}
              label="Class Code"
            />
            <Input
              type="number"
              value={c.credits}
              onChange={(ev) => setCredits(ev.target.value)}
              label="Credits"
            />
          </Flex>
          <Flex direction="row" columnGap={12}>
            <SelectWrapper label="Term">
              <Select
                label="Term"
                value={terms[c.term]}
                onChange={(ev) => ev && setTerm(ev.value as number)}
                options={terms}
              />
            </SelectWrapper>
            <SelectWrapper label="Status">
              <Select
                label="Status"
                value={statuses.find((s) => s.value === c.status)!}
                onChange={(ev) => ev && setStatus(ev.value as ClassStatus)}
                options={statuses}
              />
            </SelectWrapper>
          </Flex>
          <Flex direction="column" rowGap={12}>
            <h2>Prerequisites</h2>
            <Flex direction="row">
              <SelectWrapper label="All Of">
                <Select
                  isMulti
                  options={classes.map((c) => ({
                    value: c.id,
                    label: `${c.code} - ${c.name}`,
                  }))}
                  onChange={(value) =>
                    setPrereqAllOf(value.map((v) => v.value))
                  }
                  value={c.prereqs.allOf.map((id) => ({
                    value: id,
                    label: (() => {
                      const cls = classes.find((c) => c.id === id);
                      return cls
                        ? `${cls.code} - ${cls.name}`
                        : `Undefined Class`;
                    })(),
                  }))}
                />
              </SelectWrapper>
            </Flex>
            <Flex direction="row">
              <SelectWrapper label="Any Of">
                <Select
                  isMulti
                  options={classes.map((c) => ({
                    value: c.id,
                    label: `${c.code} - ${c.name}`,
                  }))}
                  onChange={(value) =>
                    setPrereqAnyOf(value.map((v) => v.value))
                  }
                  value={c.prereqs.anyOf.map((id) => ({
                    value: id,
                    label: (() => {
                      const cls = classes.find((c) => c.id === id);
                      return cls
                        ? `${cls.code} - ${cls.name}`
                        : `Undefined Class`;
                    })(),
                  }))}
                />
              </SelectWrapper>
            </Flex>
          </Flex>
          <Flex direction="row" justify="flex-end">
            <button type="submit">Submit</button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default ClassEditor;
