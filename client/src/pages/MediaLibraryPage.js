import DisplayMedia from '../components/ui/DisplayMedia'

const MediaLibraryPage = ({userData}) => {
  return (
    <div>
      <div>Media Library</div>
      <DisplayMedia userData={userData}/>
    </div>
  )
};

export default MediaLibraryPage;
