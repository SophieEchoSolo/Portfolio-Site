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
          placeholder={`${clothesPart} in cm`}
          onChange={(ev) => SetFormValue(ev.target.value)}
        />
      </td>
      <td>=</td>
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
          placeholder={`Size in cm`}
          onChange={(ev) => {
            SetFormValue(ev.target.value);
            if (ev.target.value) updateContentLive();
          }}
          onBlur={updateContent}
        />
      </td>
      <td>=</td>
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
          <h4>Size Converter App</h4>
          <p>
            Please choose a template and then enter the appropriate measurements. This app will
            convert the sizing from centimeters to inches for easier international shopping.{' '}
          </p>
          <p>
            The custom template will allow you to create your own garment template. Rows will be
            removed as data is cleared.
          </p>
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select id="templateSelect" onChange={(ev) => SetSelectedKey(ev.target.value)}>
            <option value="">Select Clothing Template</option>
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
