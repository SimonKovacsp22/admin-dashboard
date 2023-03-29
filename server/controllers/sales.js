import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  const overallStats = await OverallStat.find();
  res.status(200).json(overallStats[0]);
  try {
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
