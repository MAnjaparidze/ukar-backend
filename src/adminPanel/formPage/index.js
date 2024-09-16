function handleFormSubmit() {
  const form = document.getElementById("car-wash_form");
  const submitter = document.getElementById("submit_btn");

  // const formData = new FormData(form);
  alert(`${formData}`);
  let formObj = {};

  for (let p of formData) {
    console.log(p[0], p[1]);
  }

  console.log(formData.getAll, "[FORM DATA]");
}
