import BaseApi from './BaseApi'
import URLS from './Urls'

class AnnouncementApi {
  async fetchAllAnnouncements(data) {
    return BaseApi.getWithParams(URLS.ANNOUNCEMENTS, data).then((res) => {
      return res
    })
  }
}

export default new AnnouncementApi()
