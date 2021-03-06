import fs from 'fs';
import path from 'path';

const id = () => {
  let int = Math.random().toString();
  let id = int.slice(2);
  return parseInt(id);
};

export const buildFeedbackPath = () => {
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  return filePath
};

export const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data
}

const handler = (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.feedback;

    const newFeedback = {
      id: id(),
      email: email,
      text: feedbackText,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath)
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)
    res.status(200).json(data);
  }
};

export default handler;
