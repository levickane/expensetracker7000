const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#item-name').value.trim();
  const amount = document.querySelector('#item-amount').value.trim();
  const date = document.querySelector('#item-date').value.trim();
    console.log(name, amount, date);
  if (name && amount && date) {
    const response = await fetch(`/api/expenses/newexpense`, {
      method: 'POST',
      body: JSON.stringify({ name, amount, date }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('#submitBtn1')
  .addEventListener('click', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
