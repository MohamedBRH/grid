package com.gu.thrall.config

import com.gu.mediaservice.model.SyndicationRights
import org.joda.time.DateTime
import play.api.libs.json.JsValue

case class InvokingEvent(records: Array[InvokingEventRecord])

case class InvokingEventRecord(eventVersion: String, eventSubscriptionArn: String, eventSource: String, sns: Sns)

case class Sns(subject: String, message: Image)

case class Image(id: String, data: Option[JsValue], syndicationRights: Option[SyndicationRights], lastModified: Option[DateTime], original: Option[String]) {
  def withOriginal(original: String) = {Image(id, data, syndicationRights, lastModified, Some(original))}
}

case class ElasticSearchHits(total: Int, hits: Option[List[ElasticSearchHit]])

case class ElasticSearchHit(source: Image)

case class ElasticSearchResponse(total: Option[Int], hits: Option[ElasticSearchHits], suggest: JsValue)

