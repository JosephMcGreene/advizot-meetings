async function getSignIns() {
  console.log("Got it!");
  res.json({ greeting: "Got it!" });
}

const profileController = {
  getSignIns,
};

export default profileController;
