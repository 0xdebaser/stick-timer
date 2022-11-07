import writeEditedEntry from "../../utilties/writeEditedEntry";

async function handleSubmit(event, race, stickNumber) {
  event.preventDefault();

  let name;
  const nameEl = document.getElementById("name");
  if (nameEl.hasOwnProperty("value")) {
    name = nameEl.value;
  } else {
    const name = "";
  }

  let distance;
  if (document.querySelector("input[name='distances']:checked")) {
    distance = document.querySelector("input[name='distances']:checked").value;
  }

  let gender;
  if (document.querySelector("input[name='genders']:checked")) {
    gender = document.querySelector("input[name='genders']:checked").value;
  }

  console.log(`handleSubmit called for ${race} -- stick no. ${stickNumber}`);
  console.log(`Name: ${name}`);
  console.log(`Distance: ${distance}`);
  console.log(`Gender: ${gender}`);

  const updated = await writeEditedEntry(
    race,
    stickNumber,
    name,
    distance,
    gender
  );

  console.log(updated);
}

export default handleSubmit;
