(function() {
  // Query params names parser
  const searchParams = new URLSearchParams(window.location.search);
  const allNames = searchParams.get("i") ? searchParams.get("i").split(",").map((n) => n.trim()[0].toUpperCase() + n.trim().slice(1)) : [];
  if (allNames.length > 0) {
    const names = allNames.slice(0, -1);
    const last = allNames[allNames.length - 1];
    const greetings = document.querySelector(".details .i");
    const joinedNames = allNames.length > 1 ? `${names.join(", ")} y ${last}` : last;
    const verb = allNames.length > 1 ? "Tienen" : "Tenes";
    greetings.innerHTML = `<b>${joinedNames},</b><br/>¿${verb} alguna restricción alimentaria?`;
  }

  // RSVP handlers
  const rsvpButton = document.getElementById("rsvp");
  rsvpButton.addEventListener("click", (event) => {
    if (rsvpButton.classList.contains("disabled")) return;

    if (rsvpButton.textContent === "RSVP - CONFIRMAR ASISTENCIA") {
      rsvpButton.parentElement.classList.add("expanded");
      rsvpButton.classList.remove("light");
      document.getElementById("rsvp-options").classList.remove("hidden");
      rsvpButton.textContent = "¡CONFIRMAR!";
    } else {
      const noneChecked = document.getElementById("rsvp-none").checked;
      const veggieChecked = document.getElementById("rsvp-veggie").checked;
      const veganoChecked = document.getElementById("rsvp-vegano").checked;
      const celiacChecked = document.getElementById("rsvp-celiac").checked;

      if (!noneChecked && !veggieChecked && !veganoChecked && !celiacChecked) {
        return alert("Por favor seleccioná una opción para confirmar tu asistencia");
      }
      const answer = noneChecked ? ["Ninguna"] : [];
      if (veggieChecked) answer.push("Vegetariana");
      if (veganoChecked) answer.push("Vegana");
      if (celiacChecked) answer.push("Celíaca");

      rsvpButton.classList.add("disabled");
      rsvpButton.textContent = "...";

      const formId = '1FAIpQLSelZp_QPF3onl2EaPCTT0j3ZkCsdiALX_QTczPPqHaFyJIecw';
      const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
      const body = new URLSearchParams();
      body.append('entry.1303125680', allNames.join(",")); // Nombres
      body.append('entry.2088391464', allNames.length); // PAX
      body.append('entry.1417187734', answer.join(",")); // Dieta
      body.append('fvv', "1");
      body.append('submit', "Submit");
      const opts = {
        method: "POST",
        mode: "no-cors", // Required for Google Forms
        redirect: "follow",
        referrer: "no-referrer",
        body,
      };
      fetch(formUrl, opts).then((response) => {
        rsvpButton.textContent = "¡NOS VEMOS!";
        rsvpButton.parentElement.classList.remove("expanded");
        rsvpButton.classList.add("light");
        document.getElementById("rsvp-options").classList.add("hidden");
      }).catch((error) => {
        rsvpButton.classList.remove("disabled");
        rsvpButton.textContent = "¡CONFIRMAR!";
        alert("Error al enviar la respuesta. Por favor intentá nuevamente.");
      });
    }
  });

  // Present handlers
  const presentButton = document.getElementById("present");
  if (window.innerWidth < 960) {
    presentButton.classList.add("light");
    presentButton.classList.remove("outlined");
  }
  presentButton.addEventListener("click", (event) => {
    if (presentButton.style.height === 0) return;
    presentButton.parentElement.classList.add("expanded");
    document.getElementById("present-options").classList.remove("hidden");
    presentButton.style.display = "none";
    presentButton.style.height = 0;
  });


  // Alias handlers
  const copyToClipboard = (text) => {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Copiaste los datos de cuenta a tu portapapeles");
  };
  document.getElementById("alias-ars").addEventListener("click", () => {
    copyToClipboard("MEC1985CA");
  });
  document.getElementById("alias-usd").addEventListener("click", () => {
    copyToClipboard("MEC1985CAU");
  });
  document.getElementById("alias-zelle").addEventListener("click", () => {
    copyToClipboard("mecohen@gmail.com");
  });
})();
