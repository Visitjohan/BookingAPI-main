import express from "express";
import "dotenv/config";
import * as Sentry from "@sentry/node";
import amenitiesRouter from "../src/routes/amenities.js";
import bookingsRouter from "../src/routes/bookings.js";
import hostsRouter from "../src/routes/hosts.js";
import propertiesRouter from "../src/routes/properties.js";
import reviewsRouter from "../src/routes/reviews.js";
import usersRouter from "../src/routes/users.js";
import loginRouter from "../src/routes/login.js";
import logMiddleware from "../src/middleware/logMiddleware.js";
import errorHandler from "../src/middleware/errorHandler.js";

const app = express();

Sentry.init({
  dsn: "https://7950f9fd1e9878f9e21a273cdeb8bc31@o4507485396205568.ingest.de.sentry.io/4507485401907280",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(logMiddleware);
// Resource routes..
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
