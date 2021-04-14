FROM osrf/ros:noetic-desktop

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

CMD [""]