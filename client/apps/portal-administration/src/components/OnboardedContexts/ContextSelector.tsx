import { SearchableDropdownResultItem } from "@equinor/fusion-react-searchable-dropdown";
import { useState } from "react";
import { Autocomplete, Icon, Typography } from "@equinor/eds-core-react";
import styled from "styled-components";
import { FieldError } from "react-hook-form";
import { useContextSearch } from "../../hooks/use-context-search";
import { error_filled } from "@equinor/eds-icons";

const Style = {
  ItemWrapper: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 0rem;
    min-width: 500px;
    gap: 0.25rem;
  `,
};

export const ContextSelector = ({
  types,
  onOptionsChange,
  message,
  errors,
  onChange,
}: {
  types: string[];
  onOptionsChange: (context: SearchableDropdownResultItem) => void;
  errors?: FieldError;
  message?: string;
  onChange?: VoidFunction;
}) => {
  const [input, setInput] = useState<string>("");
  const { data, isLoading } = useContextSearch(input, types);

  const search = async (input: string) => {
    setInput(input);
  };

  return (
    <Autocomplete<SearchableDropdownResultItem>
      id="app-context-types"
      onInputChange={search}
      options={data || []}
      loading={isLoading}
      variant={errors && "error"}
      helperText={message}
      onChange={() => {
        onChange && onChange();
      }}
      helperIcon={
        errors && <Icon data={error_filled} title="Error" size={16} />
      }
      onOptionsChange={(value) => {
        onOptionsChange(value?.selectedItems[0]);
      }}
      noOptionsText={isLoading ? "Loading data.." : "No options"}
      optionComponent={CustomItem}
      optionLabel={(contextTypes) => contextTypes.title || "Not found"}
      itemCompare={(item, compare) => {
        return item === compare;
      }}
      optionsFilter={() => true}
      label="Search Context"
      multiline
    />
  );
};

function CustomItem(option: SearchableDropdownResultItem) {
  const { title, subTitle } = option;
  return (
    <Style.ItemWrapper>
      <Typography variant="h5">{title}</Typography>
      <Typography group="paragraph" variant="caption">
        {subTitle}
      </Typography>
    </Style.ItemWrapper>
  );
}
