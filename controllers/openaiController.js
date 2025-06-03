const OpenAI = require("openai");

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  const imageSize =
    size === "small"
      ? "1024x1024"
      : size === "medium"
      ? "1024x1792"
      : "1792x1024";

  try {
    const response = await openAIClient.images.generate({
      prompt,
      n: 1,
      model: "dall-e-3",
      size: imageSize,
      response_format: "url",
    });

    const { url, revised_prompt } = response.data[0];

    res.status(200).json({
      success: true,
      data: url,
      revised_prompt,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "The image could not be generated.",
    });
  }
};

module.exports = {
  generateImage,
};
