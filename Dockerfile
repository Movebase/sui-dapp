# Install dependencies only when needed
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Install BASH to make our lives easier for entrypoint.sh...
RUN apk add bash

WORKDIR /app
COPY package.json yarn.lock ./
COPY src/services/api/swagger.json ./src/services/api/swagger.json
RUN yarn install --frozen-lockfile --network-timeout 100000

# Rebuild the source code only when needed
FROM node:18-alpine AS builder

# Install BASH to make our lives easier for entrypoint.sh...
RUN apk add bash

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  NEXT_PUBLIC_DAPP_API_URL=APP_NEXT_PUBLIC_DAPP_API_URL \
  yarn build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner

# Install BASH to make our lives easier for entrypoint.sh...
RUN apk add bash

WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

# Set mode "standalone" in file "next.config.js"
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

############
# Permissions to write files when executing entrypoint
RUN chown -R nextjs:nodejs /app

# https://devpress.csdn.net/cloudnative/62f319d77e66823466186213.html
# https://www.tomoliver.net/posts/nextjs-docker-public-env-vars
# Handle Entrypoint
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["/bin/bash", "/app/entrypoint.sh"]
############

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]