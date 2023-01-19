
const handler = async (req, res) => {
    console.log(req)
    res.send({ message: 'seeded successfully' });
};
export default handler;