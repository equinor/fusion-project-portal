import {
  SearchableDropdownResolver,
  useDropdownProviderRef,
  DropdownProvider,
  Dropdown,
} from "@equinor/fusion-react-searchable-dropdown";

const myResolver: SearchableDropdownResolver = {
  searchQuery: async (query: string) => {
    return [
      {
        graphic: "list",
        id: "456",
        isSelected: false,
        subTitle: "ContextType",
        title: "Context 1",
      },
      {
        graphic: "list",
        id: "654",
        isSelected: false,
        subTitle: "ContextType",
        title: "Context 2",
      },
      {
        graphic: "list",
        id: "789",
        isSelected: false,
        subTitle: "ContextType",
        title: "Context 3",
      },
      {
        graphic: "list",
        id: "321",
        isSelected: false,
        subTitle: "ContextType",
        title: "Context 4",
      },
    ];
  },
  initialResult: [
    // pre search available results
  ],
  closeHandler: (e) => {
    // callback after UI close dropdown list
  },
};

export const ContextSelector = () => {
  const providerRef = useDropdownProviderRef(myResolver);
  return (
    <DropdownProvider ref={providerRef}>
      <Dropdown
        dropdownHeight="300px"
        initialText="The initial text result"
        variant="header-filled"
      />
    </DropdownProvider>
  );
};
