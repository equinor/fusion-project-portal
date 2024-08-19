import { Card, Button, Icon, Autocomplete } from "@equinor/eds-core-react";
import { add } from "@equinor/eds-icons";
import styled from "styled-components";
import { useGetContextTypes } from "../../hooks/use-context-type-query";
import { ContextSelector, useContextById } from "./ContextSelector";
import { useState } from "react";

const Styles = {
  Content: styled.div`
    padding: 0 1rem;
  `,
  Card: styled(Card)`
    padding: 1rem;
  `,
  ActionBar: styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  `,
};

export const AddContext = () => {
  const { data: contextTypes } = useGetContextTypes();
  const [types, setTypes] = useState<string[]>([]);
  const [activeContextIs, setActiveContextId] = useState<string | undefined>(
    ""
  );

  const { data } = useContextById(activeContextIs);
  return (
    <Styles.Card>
      <ContextSelector
        types={types}
        onChange={(context) => {
          setActiveContextId(context.id);
        }}
      />
      <Autocomplete<string>
        id="app-context-types"
        multiple
        options={contextTypes?.map((c) => c.type) || []}
        optionLabel={(contextTypes) => contextTypes}
        itemCompare={(item, compare) => {
          return item === compare;
        }}
        onOptionsChange={({ selectedItems }) => {
          setTypes(selectedItems);
        }}
        label="Context Types"
      />
      <Button variant="outlined">
        <Icon data={add} />
        Add new Context
      </Button>
    </Styles.Card>
  );
};
