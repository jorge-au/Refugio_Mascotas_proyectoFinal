async function loginUser() {
  const usuario = document.querySelector('#usuario').value;
  const contrasena = document.querySelector('#contrasena').value;

  const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, contrasena }),
  });

  const data = await response.json();

  if (response.status === 200) {
      localStorage.setItem('token', data.token);
      window.location.href = '/adoptantes';
  } else {
      alert(data.msg);
  }
}

// Al enviar una solicitud protegida
async function fetchAdoptantes() {
  const token = localStorage.getItem('token');
  const response = await fetch('/adoptantes', {
      method: 'GET',
      headers: {
          'Authorization': token
      }
  });

  // Manejar respuesta
}
