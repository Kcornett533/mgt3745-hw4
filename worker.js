// worker.js
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

export default {
  async fetch(request, env) {
    try {
      return await handle(request, env);
    } catch (err) {
      return new Response("server error: " + err.message, { status: 500, headers: CORS });
    }
  },
};

async function handle(request, env) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (!env.DB) {
    return new Response(
      "server error: no D1 binding. Check database_id in wrangler.toml and redeploy.",
      { status: 500, headers: CORS }
    );
  }

  // GET /entries - Fetch all provenance records in creation order
  if (request.method === "GET" && url.pathname === "/entries") {
    const { results } = await env.DB.prepare(
      "SELECT id, manifest_id AS id_str, pipeline_name AS pipelineName, execution_params AS executionParams, file_signature AS fileSignature, notes, created_at AS timestamp FROM entries ORDER BY id DESC"
    ).all();
    return Response.json(results || [], { headers: CORS });
  }

  // POST /entries - Store a new provenance record with EARS validation
  if (request.method === "POST" && url.pathname === "/entries") {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("body must be JSON", { status: 400, headers: CORS });
    }

    // Required fields check
    if (!body.pipelineName || !body.executionParams || !body.fileSignature) {
      return new Response("pipelineName, executionParams, and fileSignature are required", { status: 400, headers: CORS });
    }

    // EARS Unwanted-Behavior Validation Rule: Strict 64-character Hexadecimal SHA-256 Signature
    const hex64Regex = /^[a-fA-F0-9]{64}$/;
    if (!hex64Regex.test(body.fileSignature)) {
      return new Response("fileSignature must be exactly 64 hexadecimal characters", { status: 400, headers: CORS });
    }

    const manifestId = body.id || ('MAN-' + Date.now());
    const notes = body.notes || 'N/A';

    // Safe SQL Binding (No string concatenation)
    await env.DB.prepare(
      "INSERT INTO entries (manifest_id, pipeline_name, execution_params, file_signature, notes) VALUES (?, ?, ?, ?, ?)"
    )
      .bind(manifestId, body.pipelineName, body.executionParams, body.fileSignature, notes)
      .run();

    return new Response(null, { status: 201, headers: CORS });
  }

  return new Response("not found", { status: 404, headers: CORS });
}
