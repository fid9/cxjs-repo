import { Button, Checkbox, DateField, HtmlElement, Overlay, TextArea, TextField, Window } from "cx/widgets";

<cx>
    <div>
        <Window
                title="Contact"
                visible={{ bind: "$page.contact.visible", defaultValue: false }}
                center
                style={{ width: "500px" }}
                modal
            >
                <div
                style={{ padding: "20px" }}
                layout={{ type: LabelsLeftLayout, mod: "stretch" }}
                >
                <TextField
                    label="Name"
                    value:bind="$page.contact.name"
                    style={{ width: "100%" }}
                />
                <TextField
                    label="Email"
                    value:bind="$page.contact.email"
                    style={{ width: "100%" }}
                />
                <TextArea
                    label="Message"
                    value:bind="$page.contact.message"
                    rows={10}
                    style={{ width: "100%" }}
                />
                <DateField label="Date" value:bind="$page.contact.date" />
                </div>
                <div putInto="footer" style={{ float: "right" }} trimWhitespace={false}>
                <Button mod="primary">Submit</Button>
                <Button
                    onClick={(e, ins) => {
                    ins.parentOptions.dismiss();
                    }}
                >
                    Cancel
                </Button>
                </div>
            </Window>
      </div>
  </cx>