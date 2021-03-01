const SERVER_API = "http://ec2-18-207-142-206.compute-1.amazonaws.com";

export const post = (uri, data) => {
  return new Promise((resolve, reject) => {
    fetch(`${SERVER_API}${uri}`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export const get = (uri) => {
  return new Promise((resolve, reject) => {
    fetch(`${SERVER_API}${uri}`)
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export const patch = (uri, data) => {
  return new Promise((resolve, reject) => {
    fetch(`${SERVER_API}${uri}`, {
      body: JSON.stringify(data),
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export const _delete = (uri) => {
  return new Promise((resolve, reject) => {
    fetch(`${SERVER_API}${uri}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};
