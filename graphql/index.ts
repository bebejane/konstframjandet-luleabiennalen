import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export const ImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FileField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"responsiveImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imgixParams"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"auto"},"value":{"kind":"EnumValue","value":"format"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}}]}}]}}]} as unknown as DocumentNode<ImageFragment, unknown>;
export const AboutFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AboutFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AboutRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_modelApiKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"intro"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageFragment"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageGalleryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageFragment"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ButtonRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"providerUid"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RecordInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"_seoMetaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}}]}}]} as unknown as DocumentNode<AboutFragment, unknown>;
export const ImageMediumFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageMediumFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FileField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"responsiveImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imgixParams"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"q"},"value":{"kind":"IntValue","value":"70"}},{"kind":"ObjectField","name":{"kind":"Name","value":"ar"},"value":{"kind":"StringValue","value":"3:2","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"fit"},"value":{"kind":"EnumValue","value":"crop"}},{"kind":"ObjectField","name":{"kind":"Name","value":"auto"},"value":{"kind":"EnumValue","value":"format"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sizes"},"value":{"kind":"StringValue","value":"(max-width: 46.24em) 100vw, 50vw","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"base64"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}}]}}]}}]} as unknown as DocumentNode<ImageMediumFragment, unknown>;
export const ImageThumbnailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageThumbnailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FileField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"responsiveImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imgixParams"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"q"},"value":{"kind":"IntValue","value":"50"}},{"kind":"ObjectField","name":{"kind":"Name","value":"ar"},"value":{"kind":"StringValue","value":"3:2","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"fit"},"value":{"kind":"EnumValue","value":"crop"}},{"kind":"ObjectField","name":{"kind":"Name","value":"auto"},"value":{"kind":"EnumValue","value":"format"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"sizes"},"value":{"kind":"StringValue","value":"(max-width: 46.24em) 50vw, 25vw","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]}}]} as unknown as DocumentNode<ImageThumbnailFragment, unknown>;
export const NewsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NewsRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"intro"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"markdown"},"value":{"kind":"BooleanValue","value":false}}]},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"_createdAt"}}]}}]} as unknown as DocumentNode<NewsFragment, unknown>;
export const SiteFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SiteFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Site"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"favicon"},"name":{"kind":"Name","value":"faviconMetaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"globalSeo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebookPageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"siteName"}},{"kind":"Field","name":{"kind":"Name","value":"titleSuffix"}},{"kind":"Field","name":{"kind":"Name","value":"twitterAccount"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackSeo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"twitterCard"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageFragment"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SiteFragment, unknown>;
export const VideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FileField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"streamingUrl"}},{"kind":"Field","alias":{"kind":"Name","value":"mp4high"},"name":{"kind":"Name","value":"mp4Url"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"res"},"value":{"kind":"EnumValue","value":"high"}}]},{"kind":"Field","alias":{"kind":"Name","value":"mp4med"},"name":{"kind":"Name","value":"mp4Url"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"res"},"value":{"kind":"EnumValue","value":"medium"}}]},{"kind":"Field","alias":{"kind":"Name","value":"mp4low"},"name":{"kind":"Name","value":"mp4Url"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"res"},"value":{"kind":"EnumValue","value":"low"}}]},{"kind":"Field","name":{"kind":"Name","value":"framerate"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<VideoFragment, unknown>;
export const AllAboutsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllAbouts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IntType"}},"defaultValue":{"kind":"IntValue","value":"100"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IntType"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"abouts"},"name":{"kind":"Name","value":"allAbouts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"_createdAt_DESC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AboutFragment"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"pagination"},"name":{"kind":"Name","value":"_allAboutsMeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},...AboutFragmentDoc.definitions,...ImageFragmentDoc.definitions]} as unknown as DocumentNode<AllAboutsQuery, AllAboutsQueryVariables>;
export const AboutDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"About"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"about"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AboutFragment"}}]}}]}},...AboutFragmentDoc.definitions,...ImageFragmentDoc.definitions]} as unknown as DocumentNode<AboutQuery, AboutQueryVariables>;
export const AllAboutsMenuDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllAboutsMenu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"abouts"},"name":{"kind":"Name","value":"allAbouts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<AllAboutsMenuQuery, AllAboutsMenuQueryVariables>;
export const AllNewsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllNews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IntType"}},"defaultValue":{"kind":"IntValue","value":"100"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IntType"}},"defaultValue":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"news"},"name":{"kind":"Name","value":"allNews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"_createdAt_DESC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NewsFragment"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"pagination"},"name":{"kind":"Name","value":"_allNewsMeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},...NewsFragmentDoc.definitions]} as unknown as DocumentNode<AllNewsQuery, AllNewsQueryVariables>;
export const NewsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"News"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"news"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NewsFragment"}}]}}]}},...NewsFragmentDoc.definitions]} as unknown as DocumentNode<NewsQuery, NewsQueryVariables>;
export const AllYearsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllYears"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"years"},"name":{"kind":"Name","value":"allYears"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"paticipantName"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hex"}}]}}]}}]}}]} as unknown as DocumentNode<AllYearsQuery, AllYearsQueryVariables>;