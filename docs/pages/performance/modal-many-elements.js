import React from 'react';
import Modal from '@material-ui/core/Modal';

const rows = Array.from({ length: 20 }, (_, index) => {
  return { id: index, name: `name-${index}`, calories: index * 2, fat: index * 3 };
});

function handleRender(id, phase, actualDuration, baseDuration) {
  console.log(`${phase} ${id}`, actualDuration, baseDuration);
}

export default function ModalManyElements() {
  const [, rerender] = React.useReducer(n => n + 1, 0);

  return (
    <React.Profiler id="many-elements" onRender={handleRender}>
      <button type="button" onClick={rerender}>
        rerender
      </button>
      <Modal open={false}>
        <table>
          <thead>
            <tr>
              <td>Dessert (100g serving)</td>
              <td>Calories</td>
              <td>Fat (g)</td>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <th scope="row">{row.name}</th>
                <td>{row.calories}</td>
                <td>{row.fat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </React.Profiler>
  );
}
