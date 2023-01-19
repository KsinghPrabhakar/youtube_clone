import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { FetchFromAPI } from "../util/FetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [video, setVideo] = useState([]);
  const { id } = useParams();
  console.log("channel data is", channelDetail, "video data is", video);
  useEffect(() => {
    FetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );
    FetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideo(data?.items)
    );
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background: "rgb(0,36,1)",
            background:
              "linear-gradient(90deg, rgba(0,36,1,1) 0%, rgba(121,9,106,1) 35%, rgba(0,255,233,1) 100%)",
            zIndex: "10",
            height: "300px",
          }}
        />
        <Box display="flex" justifyContent="center">
          <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
        </Box>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={video} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
