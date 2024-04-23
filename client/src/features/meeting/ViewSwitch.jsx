import ReactSwitch from "react-switch";

export default function ViewSwitch({ cardView, toggleCardView }) {
  return (
    <ReactSwitch
      checked={cardView}
      onChange={() => toggleCardView()}
      checkedIcon={
        // address-card-solid.svg with some custom edits
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          width="22"
          style={{ marginTop: "4px", marginLeft: "4.5px" }}
        >
          <path
            fill="#171717"
            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
          />
        </svg>
      }
      onColor="#b8b8b8" // In /scss, this is $advizot-grey
      onHandleColor="#171717"
      uncheckedIcon={
        // table-solid.svg with some custom edits
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="22"
          style={{ marginTop: "3px", marginLeft: "3px" }}
        >
          <path
            fill="#171717"
            d="M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"
          />
        </svg>
      }
      offColor="#b8b8b8" // In /scss, this is $advizot-grey
      offHandleColor="#171717"
    />
  );
}
