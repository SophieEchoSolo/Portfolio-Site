/*
sizes = {}

def main():

    template = int(input("Please choose a template: \n [0] Top \n [1] Bottom \n [2] Custom: "))

    if template == 0:
        keys = ["Bust", "Waist", "Shoulder Width", "Sleeve Length"]
    elif template == 1:
        keys = ["Waist", "Hips", "Length"]
    else:
        keys = None

    for k in keys:
        sizes.update({k: 0})

    if sizes.keys() is None:

        while True: 
            clothesParts = input("Enter the part of those garment being measured (enter exit to stop): ")

            if clothesParts.lower() == "exit":
                break
            else:
                partSize = float(input("Enter the measurement in cm: "))
                sizes.update({clothesParts: round((partSize * 0.393701))})



    else: 
        for k in keys:
            partSize = float(input(f"Enter size in cm for {k}: "))
            sizes.update({k: round((partSize * 0.393701))})

    print(str(sizes))

if __name__ == "__main__":
    main()
*/

import Head from 'next/head';
import { useState, useCallback } from 'react';

const Templates: Partial<Record<string, string[] | null>> = {
  Top: ['Bust', 'Waist', 'Shoulder Width', 'Sleeve Length'],
  Bottom: ['Waist', 'Hips', 'Length'],
  Dress: ['Bust', 'Waist', 'Shoulder Width', 'Hips', 'Length'],
  Custom: null,
};

function FormRow({ clothesPart }: { clothesPart: string }): JSX.Element {
  const [FormValue, SetFormValue] = useState('');
  const inVal = Number.parseFloat(FormValue) * 0.393701;
  return (
    <tr>
      <th>{clothesPart}</th>
      <td>
        <input
          type="number"
          placeholder={`Enter ${clothesPart} in centimeters`}
          onChange={(ev) => SetFormValue(ev.target.value)}
        />
      </td>
      <td>{!Number.isNaN(inVal) && <>{inVal.toFixed(1)}&quot;</>}</td>
    </tr>
  );
}

function Form({ template }: { template: string[] }): JSX.Element {
  return (
    <table>
      <tbody>
        {template.map((clothesPart) => (
          <FormRow key={clothesPart} clothesPart={clothesPart} />
        ))}
      </tbody>
    </table>
  );
}

function CustomFormRow({ updateRow }: { updateRow: (hasContent: boolean) => void }): JSX.Element {
  const [RowName, SetRowName] = useState('');
  const [FormValue, SetFormValue] = useState('');
  const updateContent = useCallback(() => {
    updateRow(Boolean(RowName) || Boolean(FormValue));
  }, [RowName, FormValue, updateRow]);
  const updateContentLive = useCallback(() => {
    updateRow(true);
  }, [updateRow]);
  const inVal = Number.parseFloat(FormValue) * 0.393701;
  return (
    <tr>
      <th>
        <input
          type="text"
          placeholder={`Enter name of part`}
          onChange={(ev) => {
            SetRowName(ev.target.value);
            if (ev.target.value) updateContentLive();
          }}
          onBlur={updateContent}
        />
      </th>
      <td>
        <input
          type="number"
          placeholder={`Enter size in centimeters`}
          onChange={(ev) => {
            SetFormValue(ev.target.value);
            if (ev.target.value) updateContentLive();
          }}
          onBlur={updateContent}
        />
      </td>
      <td>{!Number.isNaN(inVal) && <>{inVal.toFixed(1)}&quot;</>}</td>
    </tr>
  );
}

let counter = 1;

function CustomForm(): JSX.Element {
  const [rows, setRows] = useState<Record<string, boolean>>({ '0': false });
  const setHasContent = useCallback(
    (id: string, hasContent: boolean) => {
      setRows((old) => {
        const newRows = { ...old };
        newRows[id] = hasContent;
        const lastKey = Object.keys(newRows).pop();
        if (id === lastKey && hasContent) {
          newRows[counter.toString()] = false;
          counter += 1;
        } else if (id !== lastKey && !hasContent) {
          delete newRows[id];
        }
        return newRows;
      });
    },
    [setRows]
  );
  return (
    <table>
      <tbody>
        {Object.keys(rows).map((key) => (
          <CustomFormRow
            key={key}
            updateRow={(hasContent: boolean) => setHasContent(key, hasContent)}
          />
        ))}
      </tbody>
    </table>
  );
}

export default function Home(): JSX.Element {
  const [SelectedKey, SetSelectedKey] = useState('');
  const SelectedTemplate = Templates[SelectedKey];
  return (
    <div>
      <Head>
        <title>Size Converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-fluid">
        <div className="jumbotron">
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select id="templateSelect" onChange={(ev) => SetSelectedKey(ev.target.value)}>
            <option value="">SELECT CLOTHING TYPE</option>
            {Object.keys(Templates).map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>
          {SelectedTemplate != null && <Form template={SelectedTemplate} />}
          {SelectedTemplate === null && <CustomForm />}
        </div>
      </div>
    </div>
  );
}
