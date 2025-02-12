import { DebateResult } from "@/app/type/debate";

export async function POST(request: Request) {
  try {
    const { motion, limit } = await request.json();

    const requestBody = {
      inputs: {
        motion: motion,
        limit: limit,
      },
      response_mode: "blocking",
      user: "ham",
    };

    const requestHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    };

    const url = `${process.env.API_URL}/workflows/run`;

    console.log("request done");

    const response = await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `Dify API error: ${response.status} ${response.statusText}`
      );
    }

    const result: DebateResult = {
      govArgument: "",
      oppArgument: "",
      govRebuttal: "",
      oppRebuttal: "",
      govSummary: "",
      oppSummary: "",
      judge: "",
    };

    if (responseData.data && responseData.data.outputs) {
      if (responseData.data.outputs.gov_argument) {
        result.govArgument = responseData.data.outputs.gov_argument;
      } else {
        return Response.json(
          { error: "falil to fetch arguments" },
          { status: 500 }
        );
      }
      if (responseData.data.outputs.opp_argument) {
        result.oppArgument = responseData.data.outputs.opp_argument;
      } else {
        return Response.json(
          { error: "falil to fetch arguments" },
          { status: 500 }
        );
      }
      if (responseData.data.outputs.gov_rebuttal) {
        result.govRebuttal = responseData.data.outputs.gov_rebuttal;
      } else {
        return Response.json(
          { error: "falil to fetch arguments" },
          { status: 500 }
        );
      }
      if (responseData.data.outputs.opp_rebuttal) {
        result.oppRebuttal = responseData.data.outputs.opp_rebuttal;
      } else {
        return Response.json(
          { error: "falil to fetch arguments" },
          { status: 500 }
        );
      }
      if (responseData.data.outputs.gov_summary) {
        result.govSummary = responseData.data.outputs.gov_summary;
      } else {
        return Response.json(
          { error: "falil to fetch arguments" },
          { status: 500 }
        );
      }
      if (responseData.data.outputs.opp_summary) {
        result.oppSummary = responseData.data.outputs.opp_summary;
      } else {
        return Response.json(
          { error: "falil to fetch arguments" },
          { status: 500 }
        );
      }
      if (responseData.data.outputs.judge) {
        result.judge = responseData.data.outputs.judge;
      } else {
        return Response.json(
          { error: "falil to fetch arguments" },
          { status: 500 }
        );
      }
    }

    return Response.json(result);
  } catch (error: unknown) {
    return Response.json(
      { error: `An error occurred : ${error}` },
      { status: 500 }
    );
  }
}
