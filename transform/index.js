(function () {
    'use strict';
    var fs = require('fs');
    require('dive')('./kanjivg', diveFileHandler, function () {
        console.log(commandTypeStats);
    });

    var commandTypeStats = {};
    var angles = {};
    var joyo = ['04E9C', '054C0', '06328', '0611B', '066D6', '060AA', '063E1', '05727', '06271', '05B9B', '05D50', '05B89', '06848', '06697', '04EE5', '08863', '04F4D', '056F2', '0533B', '04F9D', '059D4', '05A01', '070BA', '0754F', '080C3', '05C09', '07570', '079FB', '0840E', '05049', '06905', '05F59', '0610F', '09055', '07DAD', '06170', '0907A', '07DEF', '057DF', '080B2', '04E00', '058F1', '09038', '08328', '0828B', '05F15', '05370', '056E0', '054BD', '059FB', '054E1', '09662', '06DEB', '09670', '098F2', '096A0', '097FB', '053F3', '05B87', '07FBD', '096E8', '05504', '09B31', '0755D', '06D66', '0904B', '096F2', '06C38', '06CF3', '082F1', '06620', '06804', '055B6', '08A60', '05F71', '092ED', '0885B', '06613', '075AB', '076CA', '06DB2', '099C5', '060A6', '08D8A', '08B01', '095B2', '05186', '05EF6', '06CBF', '0708E', '06028', '05BB4', '05A9B', '063F4', '05712', '07159', '0733F', '09060', '0925B', '05869', '06F14', '07E01', '08276', '06C5A', '0738B', '051F9', '0592E', '05FDC', '05F80', '062BC', '065FA', '06B27', '06BB4', '0685C', '07FC1', '05965', '06A2A', '05CA1', '05C4B', '05104', '061B6', '081C6', '0865E', '04E59', '04FFA', '05378', '097F3', '06069', '06E29', '07A4F', '04E0B', '05316', '0706B', '052A0', '053EF', '04EEE', '04F55', '082B1', '04F73', '04FA1', '0679C', '06CB3', '082DB', '079D1', '067B6', '0590F', '05BB6', '08377', '083EF', '083D3', '08CA8', '06E26', '0904E', '05AC1', '06687', '0798D', '09774', '05BE1', '06B4C', '07B87', '07A3C', '08AB2', '0868A', '07259', '074E6', '06211', '0753B', '082BD', '08CC0', '096C5', '09913', '04ECB', '056DE', '07070', '04F1A', '05FEB', '06212', '06539', '0602A', '062D0', '06094', '06D77', '0754C', '07686', '068B0', '07D75', '0958B', '0968E', '0584A', '06977', '089E3', '06F70', '058CA', '061D0', '08AE7', '08C9D', '05916', '052BE', '05BB3', '05D16', '06DAF', '08857', '06168', '084CB', '08A72', '06982', '09AB8', '057A3', '067FF', '05404', '089D2', '062E1', '09769', '0683C', '06838', '06BBB', '090ED', '0899A', '08F03', '09694', '095A3', '078BA', '07372', '05687', '07A6B', '05B66', '05CB3', '0697D', '0984D', '0984E', '0639B', '06F5F', '062EC', '06D3B', '0559D', '06E07', '05272', '0845B', '06ED1', '08910', '08F44', '04E14', '0682A', '091DC', '0938C', '05208', '05E72', '0520A', '07518', '06C57', '07F36', '05B8C', '0809D', '05B98', '051A0', '05DFB', '0770B', '09665', '04E7E', '052D8', '060A3', '08CAB', '05BD2', '0559A', '0582A', '063DB', '06562', '068FA', '06B3E', '09593', '09591', '052E7', '05BDB', '05E79', '0611F', '06F22', '06163', '07BA1', '095A2', '06B53', '076E3', '07DE9', '061BE', '09084', '09928', '074B0', '07C21', '089B3', '097D3', '08266', '09451', '04E38', '0542B', '05CB8', '05CA9', '073A9', '0773C', '09811', '09854', '09858', '04F01', '04F0E', '05371', '0673A', '06C17', '05C90', '05E0C', '05FCC', '06C7D', '05947', '07948', '05B63', '07D00', '08ECC', '065E2', '08A18', '08D77', '098E2', '09B3C', '05E30', '057FA', '05BC4', '0898F', '04E80', '0559C', '05E7E', '063EE', '0671F', '068CB', '08CB4', '068C4', '06BC0', '065D7', '05668', '0757F', '08F1D', '06A5F', '09A0E', '06280', '05B9C', '0507D', '06B3A', '07FA9', '07591', '05100', '0622F', '064EC', '072A0', '08B70', '083CA', '05409', '055AB', '08A70', '05374', '05BA2', '0811A', '09006', '08650', '04E5D', '04E45', '053CA', '05F13', '04E18', '065E7', '04F11', '05438', '0673D', '081FC', '06C42', '07A76', '06CE3', '06025', '07D1A', '07CFE', '05BAE', '06551', '07403', '07D66', '055C5', '07AAE', '0725B', '053BB', '05DE8', '05C45', '062D2', '062E0', '06319', '0865A', '08A31', '08DDD', '09B5A', '05FA1', '06F01', '051F6', '05171', '053EB', '072C2', '04EAC', '04EAB', '04F9B', '05354', '06CC1', '05CE1', '0631F', '072ED', '06050', '0606D', '080F8', '08105', '05F37', '06559', '090F7', '05883', '06A4B', '077EF', '093E1', '07AF6', '097FF', '09A5A', '04EF0', '06681', '0696D', '051DD', '066F2', '05C40', '06975', '07389', '05DFE', '065A4', '05747', '08FD1', '091D1', '083CC', '052E4', '07434', '07B4B', '050C5', '07981', '07DCA', '09326', '08B39', '0895F', '0541F', '09280', '0533A', '053E5', '082E6', '099C6', '05177', '060E7', '0611A', '07A7A', '05076', '09047', '09685', '04E32', '05C48', '06398', '07A9F', '0718A', '07E70', '0541B', '08A13', '052F2', '085AB', '08ECD', '090E1', '07FA4', '05144', '05211', '05F62', '07CFB', '05F84', '0830E', '04FC2', '0578B', '05951', '08A08', '06075', '05553', '063B2', '06E13', '07D4C', '086CD', '0656C', '0666F', '08EFD', '050BE', '0643A', '07D99', '08A63', '06176', '061AC', '07A3D', '061A9', '08B66', '09D8F', '082B8', '08FCE', '09BE8', '09699', '05287', '06483', '06FC0', '06841', '06B20', '07A74', '08840', '06C7A', '07D50', '05091', '06F54', '06708', '072AC', '04EF6', '0898B', '05238', '080A9', '05EFA', '07814', '0770C', '05039', '0517C', '05263', '062F3', '08ED2', '05065', '0967A', '0570F', '05805', '0691C', '05ACC', '0732E', '07D79', '09063', '06A29', '061B2', '08CE2', '08B19', '09375', '07E6D', '09855', '09A13', '061F8', '05143', '05E7B', '07384', '08A00', '05F26', '09650', '0539F', '073FE', '08237', '06E1B', '06E90', '053B3', '05DF1', '06238', '053E4', '0547C', '056FA', '080A1', '0864E', '05B64', '05F27', '06545', '067AF', '0500B', '05EAB', '06E56', '096C7', '08A87', '09F13', '0932E', '09867', '04E94', '04E92', '05348', '05449', '05F8C', '05A2F', '0609F', '07881', '08A9E', '08AA4', '08B77', '053E3', '05DE5', '0516C', '052FE', '05B54', '0529F', '05DE7', '05E83', '07532', '04EA4', '05149', '05411', '0540E', '0597D', '06C5F', '08003', '0884C', '05751', '05B5D', '06297', '0653B', '066F4', '052B9', '05E78', '062D8', '080AF', '04FAF', '0539A', '06052', '06D2A', '07687', '07D05', '08352', '090CA', '09999', '05019', '06821', '08015', '0822A', '08CA2', '0964D', '09AD8', '05EB7', '063A7', '06897', '09EC4', '05589', '0614C', '06E2F', '0786C', '07D5E', '09805', '06E9D', '09271', '069CB', '07DB1', '09175', '07A3F', '08208', '08861', '092FC', '08B1B', '08CFC', '04E5E', '053F7', '05408', '062F7', '0525B', '050B2', '08C6A', '0514B', '0544A', '08C37', '0523B', '056FD', '09ED2', '07A40', '09177', '07344', '09AA8', '099D2', '08FBC', '09803', '04ECA', '056F0', '06606', '06068', '06839', '05A5A', '06DF7', '075D5', '07D3A', '09B42', '058BE', '061C7', '05DE6', '04F50', '06C99', '067FB', '07802', '05506', '05DEE', '08A50', '09396', '05EA7', '0632B', '0624D', '0518D', '0707D', '059BB', '091C7', '07815', '05BB0', '0683D', '05F69', '063A1', '06E08', '0796D', '0658E', '07D30', '083DC', '06700', '088C1', '050B5', '050AC', '0585E', '06B73', '08F09', '0969B', '057FC', '05728', '06750', '05264', '08CA1', '07F6A', '05D0E', '04F5C', '0524A', '06628', '067F5', '07D22', '07B56', '09162', '0643E', '0932F', '054B2', '0518A', '0672D', '05237', '05239', '062F6', '06BBA', '05BDF', '064AE', '064E6', '096D1', '076BF', '04E09', '05C71', '053C2', '0685F', '08695', '060E8', '07523', '05098', '06563', '07B97', '09178', '08CDB', '06B8B', '065AC', '066AB', '058EB', '05B50', '0652F', '06B62', '06C0F', '04ED5', '053F2', '053F8', '056DB', '05E02', '077E2', '065E8', '06B7B', '07CF8', '081F3', '04F3A', '05FD7', '079C1', '04F7F', '0523A', '059CB', '059C9', '0679D', '07949', '080A2', '059FF', '0601D', '06307', '065BD', '05E2B', '06063', '07D19', '08102', '08996', '07D2B', '08A5E', '06B6F', '055E3', '08A66', '08A69', '08CC7', '098FC', '08A8C', '096CC', '0646F', '08CDC', '08AEE', '0793A', '05B57', '05BFA', '06B21', '08033', '081EA', '04F3C', '05150', '04E8B', '04F8D', '06CBB', '06301', '06642', '06ECB', '06148', '08F9E', '078C1', '0990C', '074BD', '09E7F', '05F0F', '08B58', '08EF8', '04E03', '020B9F', '05931', '05BA4', '075BE', '057F7', '06E7F', '05AC9', '06F06', '08CEA', '05B9F', '0829D', '05199', '0793E', '08ECA', '0820E', '08005', '05C04', '06368', '08D66', '0659C', '0716E', '0906E', '08B1D', '090AA', '086C7', '05C3A', '0501F', '0914C', '091C8', '07235', '082E5', '05F31', '05BC2', '0624B', '04E3B', '05B88', '06731', '053D6', '072E9', '09996', '06B8A', '073E0', '09152', '0816B', '07A2E', '08DA3', '05BFF', '053D7', '0546A', '06388', '09700', '05112', '06A39', '053CE', '056DA', '05DDE', '0821F', '079C0', '05468', '05B97', '062FE', '079CB', '081ED', '04FEE', '08896', '07D42', '07F9E', '07FD2', '09031', '05C31', '08846', '096C6', '06101', '0916C', '0919C', '08E74', '08972', '05341', '06C41', '05145', '04F4F', '067D4', '091CD', '05F93', '06E0B', '09283', '07363', '07E26', '053D4', '0795D', '05BBF', '06DD1', '07C9B', '07E2E', '0587E', '0719F', '051FA', '08FF0', '08853', '04FCA', '06625', '077AC', '065EC', '05DE1', '076FE', '051C6', '06B89', '07D14', '05FAA', '09806', '06E96', '06F64', '09075', '051E6', '0521D', '06240', '066F8', '05EB6', '06691', '07F72', '07DD2', '08AF8', '05973', '05982', '052A9', '05E8F', '053D9', '05F90', '09664', '05C0F', '05347', '05C11', '053EC', '05320', '05E8A', '06284', '08096', '05C1A', '062DB', '0627F', '06607', '0677E', '06CBC', '0662D', '05BB5', '05C06', '06D88', '075C7', '07965', '079F0', '07B11', '05531', '05546', '06E09', '07AE0', '07D39', '08A1F', '052DD', '0638C', '06676', '0713C', '07126', '0785D', '07CA7', '08A54', '08A3C', '08C61', '050B7', '05968', '07167', '08A73', '05F70', '0969C', '061A7', '0885D', '08CDE', '0511F', '07901', '09418', '04E0A', '04E08', '05197', '06761', '072B6', '04E57', '057CE', '06D44', '05270', '05E38', '060C5', '05834', '07573', '084B8', '07E04', '058CC', '05B22', '09320', '08B72', '091B8', '08272', '062ED', '098DF', '0690D', '06B96', '098FE', '089E6', '05631', '07E54', '08077', '08FB1', '05C3B', '05FC3', '07533', '04F38', '081E3', '082AF', '08EAB', '08F9B', '04FB5', '04FE1', '06D25', '0795E', '05507', '05A20', '0632F', '06D78', '0771F', '091DD', '06DF1', '07D33', '09032', '068EE', '08A3A', '05BDD', '0614E', '065B0', '05BE9', '09707', '085AA', '089AA', '04EBA', '05203', '04EC1', '05C3D', '08FC5', '0751A', '09663', '05C0B', '0814E', '09808', '056F3', '06C34', '05439', '05782', '0708A', '05E25', '07C8B', '08870', '063A8', '09154', '09042', '07761', '07A42', '0968F', '09AC4', '067A2', '05D07', '06570', '0636E', '06749', '088FE', '05BF8', '0702C', '0662F', '04E95', '04E16', '06B63', '0751F', '06210', '0897F', '058F0', '05236', '059D3', '05F81', '06027', '09752', '06589', '0653F', '0661F', '07272', '07701', '051C4', '0901D', '06E05', '076DB', '05A7F', '06674', '052E2', '08056', '08AA0', '07CBE', '088FD', '08A93', '09759', '08ACB', '06574', '09192', '07A0E', '05915', '065A5', '077F3', '08D64', '06614', '06790', '05E2D', '0810A', '096BB', '060DC', '0621A', '08CAC', '08DE1', '07A4D', '07E3E', '07C4D', '05207', '06298', '062D9', '07A83', '063A5', '08A2D', '096EA', '06442', '07BC0', '08AAC', '0820C', '07D76', '05343', '05DDD', '04ED9', '05360', '05148', '05BA3', '05C02', '06CC9', '06D45', '06D17', '067D3', '06247', '06813', '065CB', '08239', '06226', '0714E', '07FA8', '0817A', '08A6E', '08DF5', '07B8B', '092AD', '06F5C', '07DDA', '09077', '09078', '085A6', '07E4A', '09BAE', '05168', '0524D', '05584', '07136', '07985', '06F38', '081B3', '07E55', '072D9', '0963B', '07956', '079DF', '07D20', '063AA', '07C97', '07D44', '0758E', '08A34', '05851', '09061', '0790E', '053CC', '058EE', '065E9', '04E89', '08D70', '0594F', '076F8', '08358', '08349', '09001', '05009', '0635C', '0633F', '06851', '05DE3', '06383', '066F9', '066FD', '0723D', '07A93', '05275', '055AA', '075E9', '0846C', '088C5', '050E7', '060F3', '05C64', '07DCF', '0906D', '069FD', '08E2A', '064CD', '071E5', '0971C', '09A12', '085FB', '09020', '050CF', '05897', '0618E', '08535', '08D08', '081D3', '05373', '0675F', '08DB3', '04FC3', '05247', '0606F', '06349', '0901F', '05074', '06E2C', '04FD7', '065CF', '05C5E', '08CCA', '07D9A', '05352', '07387', '05B58', '06751', '05B6B', '05C0A', '0640D', '0905C', '04ED6', '0591A', '06C70', '06253', '059A5', '0553E', '05815', '060F0', '099C4', '0592A', '05BFE', '04F53', '08010', '05F85', '06020', '080CE', '09000', '05E2F', '06CF0', '05806', '0888B', '0902E', '066FF', '08CB8', '0968A', '06EDE', '0614B', '06234', '05927', '04EE3', '053F0', '07B2C', '0984C', '06EDD', '05B85', '0629E', '06CA2', '05353', '062D3', '08A17', '06FEF', '08AFE', '06FC1', '04F46', '09054', '08131', '0596A', '068DA', '08AB0', '04E39', '065E6', '062C5', '05358', '070AD', '080C6', '063A2', '06DE1', '077ED', '05606', '07AEF', '07DBB', '08A95', '0935B', '056E3', '07537', '06BB5', '065AD', '05F3E', '06696', '08AC7', '058C7', '05730', '06C60', '077E5', '05024', '06065', '081F4', '09045', '075F4', '07A1A', '07F6E', '07DFB', '07AF9', '0755C', '09010', '084C4', '07BC9', '079E9', '07A92', '08336', '07740', '05AE1', '04E2D', '04EF2', '0866B', '06C96', '05B99', '05FE0', '062BD', '06CE8', '0663C', '067F1', '08877', '0914E', '092F3', '099D0', '08457', '08CAF', '04E01', '05F14', '05E81', '05146', '0753A', '09577', '06311', '05E33', '05F35', '05F6B', '0773A', '091E3', '09802', '09CE5', '0671D', '08CBC', '08D85', '08178', '08DF3', '05FB4', '05632', '06F6E', '06F84', '08ABF', '08074', '061F2', '076F4', '052C5', '06357', '06C88', '073CD', '06715', '09673', '08CC3', '093AE', '08FFD', '0690E', '0589C', '0901A', '075DB', '0585A', '06F2C', '0576A', '0722A', '09DB4', '04F4E', '05448', '05EF7', '05F1F', '05B9A', '05E95', '062B5', '090B8', '04EAD', '08C9E', '05E1D', '08A02', '05EAD', '09013', '0505C', '05075', '05824', '063D0', '07A0B', '08247', '07DE0', '08AE6', '06CE5', '07684', '07B1B', '06458', '06EF4', '09069', '06575', '06EBA', '08FED', '054F2', '09244', '05FB9', '064A4', '05929', '05178', '05E97', '070B9', '05C55', '06DFB', '08EE2', '05861', '07530', '04F1D', '06BBF', '096FB', '06597', '05410', '059AC', '05F92', '09014', '090FD', '06E21', '05857', '08CED', '0571F', '05974', '052AA', '05EA6', '06012', '05200', '051AC', '0706F', '05F53', '06295', '08C46', '06771', '05230', '09003', '05012', '051CD', '05510', '05CF6', '06843', '08A0E', '0900F', '0515A', '060BC', '076D7', '09676', '05854', '0642D', '068DF', '06E6F', '075D8', '0767B', '07B54', '07B49', '07B52', '07D71', '07A32', '08E0F', '07CD6', '0982D', '08B04', '085E4', '095D8', '09A30', '0540C', '06D1E', '080F4', '052D5', '05802', '07AE5', '09053', '050CD', '09285', '05C0E', '077B3', '05CE0', '0533F', '07279', '05F97', '07763', '05FB3', '07BE4', '06BD2', '072EC', '08AAD', '06803', '051F8', '07A81', '05C4A', '05C6F', '08C5A', '09813', '08CAA', '0920D', '066C7', '04E3C', '090A3', '05948', '05185', '068A8', '08B0E', '0934B', '05357', '08EDF', '096E3', '04E8C', '05C3C', '05F10', '05302', '08089', '08679', '065E5', '05165', '04E73', '05C3F', '04EFB', '0598A', '05FCD', '08A8D', '05BE7', '071B1', '05E74', '05FF5', '0637B', '07C98', '071C3', '060A9', '07D0D', '080FD', '08133', '08FB2', '06FC3', '0628A', '06CE2', '06D3E', '07834', '08987', '099AC', '05A46', '07F75', '062DD', '0676F', '080CC', '080BA', '04FF3', '0914D', '06392', '06557', '05EC3', '08F29', '058F2', '0500D', '06885', '057F9', '0966A', '05A92', '08CB7', '08CE0', '0767D', '04F2F', '062CD', '06CCA', '08FEB', '0525D', '08236', '0535A', '08584', '09EA6', '06F20', '07E1B', '07206', '07BB1', '07BB8', '07551', '0808C', '0516B', '09262', '0767A', '09AEA', '04F10', '0629C', '07F70', '095A5', '053CD', '0534A', '06C3E', '072AF', '05E06', '06C4E', '04F34', '05224', '05742', '0962A', '0677F', '07248', '073ED', '07554', '0822C', '08CA9', '06591', '098EF', '0642C', '07169', '09812', '07BC4', '07E41', '085E9', '06669', '0756A', '086EE', '076E4', '06BD4', '076AE', '05983', '05426', '06279', '05F7C', '062AB', '080A5', '0975E', '05351', '098DB', '075B2', '079D8', '088AB', '060B2', '06249', '08CBB', '07891', '07F77', '0907F', '05C3E', '07709', '07F8E', '05099', '05FAE', '09F3B', '0819D', '08098', '05339', '05FC5', '06CCC', '07B46', '059EB', '0767E', '06C37', '08868', '04FF5', '07968', '08A55', '06F02', '06A19', '082D7', '079D2', '075C5', '063CF', '0732B', '054C1', '06D5C', '08CA7', '08CD3', '0983B', '0654F', '074F6', '04E0D', '0592B', '07236', '04ED8', '05E03', '06276', '05E9C', '06016', '0961C', '09644', '08A03', '08CA0', '08D74', '06D6E', '05A66', '07B26', '05BCC', '0666E', '08150', '06577', '0819A', '08CE6', '08B5C', '04FAE', '06B66', '090E8', '0821E', '05C01', '098A8', '04F0F', '0670D', '0526F', '05E45', '05FA9', '0798F', '08179', '08907', '08986', '06255', '06CB8', '04ECF', '07269', '07C89', '07D1B', '096F0', '05674', '058B3', '061A4', '0596E', '05206', '06587', '0805E', '04E19', '05E73', '05175', '04F75', '04E26', '067C4', '0965B', '09589', '05840', '05E63', '05F0A', '0853D', '09905', '07C73', '058C1', '074A7', '07656', '05225', '08511', '07247', '08FBA', '08FD4', '05909', '0504F', '0904D', '07DE8', '05F01', '04FBF', '052C9', '06B69', '04FDD', '054FA', '06355', '088DC', '08217', '06BCD', '052DF', '05893', '06155', '066AE', '07C3F', '065B9', '05305', '082B3', '090A6', '05949', '05B9D', '062B1', '0653E', '06CD5', '06CE1', '080DE', '04FF8', '05023', '05CF0', '07832', '05D29', '08A2A', '05831', '08702', '08C4A', '098FD', '08912', '07E2B', '04EA1', '04E4F', '05FD9', '0574A', '059A8', '05FD8', '09632', '0623F', '080AA', '067D0', '05192', '05256', '07D21', '0671B', '0508D', '05E3D', '068D2', '08CBF', '08C8C', '066B4', '081A8', '08B00', '09830', '05317', '06728', '06734', '07267', '07766', '050D5', '058A8', '064B2', '06CA1', '052C3', '05800', '0672C', '05954', '07FFB', '051E1', '076C6', '09EBB', '06469', '078E8', '09B54', '06BCE', '059B9', '0679A', '06627', '057CB', '05E55', '0819C', '06795', '053C8', '0672B', '062B9', '04E07', '06E80', '06162', '06F2B', '0672A', '05473', '09B45', '05CAC', '05BC6', '0871C', '08108', '05999', '06C11', '07720', '077DB', '052D9', '07121', '05922', '09727', '05A18', '0540D', '0547D', '0660E', '08FF7', '051A5', '076DF', '09298', '09CF4', '06EC5', '0514D', '09762', '07DBF', '09EBA', '08302', '06A21', '06BDB', '05984', '076F2', '08017', '0731B', '07DB2', '076EE', '09ED9', '09580', '07D0B', '0554F', '051B6', '0591C', '091CE', '05F25', '05384', '05F79', '07D04', '08A33', '085AC', '08E8D', '095C7', '07531', '06CB9', '055A9', '06109', '08AED', '08F38', '07652', '0552F', '053CB', '06709', '052C7', '05E7D', '060A0', '090F5', '06E67', '07336', '088D5', '0904A', '096C4', '08A98', '06182', '0878D', '0512A', '04E0E', '04E88', '04F59', '08A89', '09810', '05E7C', '07528', '07F8A', '05996', '06D0B', '08981', '05BB9', '05EB8', '063DA', '063FA', '08449', '0967D', '06EB6', '08170', '069D8', '0760D', '08E0A', '07AAF', '0990A', '064C1', '08B21', '066DC', '06291', '06C83', '06D74', '06B32', '07FCC', '07FFC', '062C9', '088F8', '07F85', '06765', '096F7', '0983C', '07D61', '0843D', '0916A', '08FA3', '04E71', '05375', '089A7', '06FEB', '085CD', '06B04', '0540F', '05229', '091CC', '07406', '075E2', '088CF', '05C65', '07483', '096E2', '09678', '07ACB', '05F8B', '06144', '07565', '067F3', '06D41', '07559', '07ADC', '07C92', '09686', '0786B', '04FB6', '065C5', '0865C', '0616E', '04E86', '04E21', '0826F', '06599', '06DBC', '0731F', '09675', '091CF', '050DA', '09818', '05BEE', '07642', '077AD', '07CE7', '0529B', '07DD1', '06797', '05398', '0502B', '08F2A', '096A3', '081E8', '07460', '06D99', '07D2F', '05841', '0985E', '04EE4', '0793C', '051B7', '052B1', '0623B', '04F8B', '09234', '096F6', '0970A', '096B7', '09F62', '09E97', '066A6', '06B74', '05217', '052A3', '070C8', '088C2', '0604B', '09023', '05EC9', '07DF4', '0932C', '05442', '07089', '08CC2', '08DEF', '09732', '08001', '052B4', '05F04', '090CE', '06717', '06D6A', '05ECA', '0697C', '06F0F', '07C60', '0516D', '09332', '09E93', '08AD6', '0548C', '08A71', '08CC4', '08107', '060D1', '067A0', '06E7E', '08155'];


// parse the file and create a new JSON file
    function diveFileHandler(err, file) {
        if (err) {
            throw err;
        }
        var filename;
        var kanji;
        var svg;
        var strokes;
        var strokesString;
        svg = fs.readFileSync(file);
        if (!svg) {
            return;
        }
        filename = parseFileName(file);
        kanji = parseKanjiChar(svg);
        if (joyo.indexOf(filename.toUpperCase()) !== -1) {
            strokes = getStrokeData(svg);
            strokes = getStrokePoints(strokes);
            strokes = addAngles(strokes);
            strokesString = JSON.stringify(strokes);
            fs.writeFileSync(
                './kanjijson/' + filename + '.json',
                '// ' + kanji + ' - ' + filename + '\n' + strokesString
            );
            angles[filename] = getAngles(strokes);
            fs.writeFileSync('./kanjijson/000_test.json', JSON.stringify(angles));
        }
    }

// given a file path, returns the file name without extension or folder names
    function parseFileName(filepath) {
        var RX = /\/([^\/]*?)(?:\.[^\.]*$|$)/;
        var filename = RX.exec(filepath);
        if (filename) {
            filename = filename[1];
        }
        return filename;
    }

// parses the kanji character from a kanjivg SVG file
    function parseKanjiChar(svg) {
        var RX = /kvg:element="(.+)"/;
        var kanji = RX.exec(svg);
        if (kanji !== null) {
            kanji = kanji[1];
        }
        return kanji;
    }

// parses stroke data from kanjivg SVG file
    function getStrokeData(svg) {
        var RXCommand = /([MmCcLlSsZzHhVvQqTtAa])[\s\d.,-]+/g,
            RXCoord = /(-?\d+(?:\.\d+)?)/g,
            RXCoordPair = /(-?\d+(?:\.\d+)?)(?:\s*,?)(-?\d+(?:\.\d+)?)/g,
            RXPath = /<path.*\sd="(.*)".*\/>/g,
            path = '',
            command = '',
            coord = '',
            kanji = [];


        // in each SVG find all paths
        while ((path = RXPath.exec(svg))) {
            var stroke = [];

            // in each path find all commands
            while ((command = RXCommand.exec(path[1]))) {
                var type = command[1],
                    RX = (type == 'h' || type == 'H' || type == 'v' || type == 'V') ? RXCoord : RXCoordPair,
                    com = {
                        'type': type,
                        'coords': []
                    };

                if (typeof commandTypeStats[type] == 'undefined') {
                    commandTypeStats[type] = 0;
                } else {
                    commandTypeStats[type]++;
                }

                // in each command find all coords
                while ((coord = RX.exec(command[0]))) {
                    if (RX == RXCoord) {
                        com.coords.push(coord[0]);
                    } else {
                        com.coords.push({
                            x: parseFloat(coord[1]),
                            y: parseFloat(coord[2])
                        });
                    }
                }
                stroke.push(com);
            }
            kanji.push(stroke);
        }
        return kanji;
    }

// returns an array with coordinates for each point in strokes
    function getStrokePoints(strokes) {
        var s = [], i, j, k;

        // for each path
        for (i = 0; i < strokes.length; i++) {
            var last = {x: 0, y: 0}, p = [];

            // for each command
            for (j = 0; j < strokes[i].length; j++) {
                switch (strokes[i][j].type) {
                    case 'M':
                    case 'm':
                        last = strokes[i][j].coords[0];
                        p.push(last);
                        break;
                    case 'C':
                        for (k = 0; k < strokes[i][j].coords.length; k++) {
                            if (k % 3 == 2) {
                                last = strokes[i][j].coords[k];
                                p.push(last);
                            }
                        }
                        break;
                    case 'c':
                        // for each coord
                        for (k = 0; k < strokes[i][j].coords.length; k++) {
                            if (k % 3 == 2) {
                                var temp1 = strokes[i][j].coords[k];
                                last = {x: last.x + temp1.x, y: last.y + temp1.y};
                                p.push(last);
                            }
                        }
                        break;
                    case 'S':
                        for (k = 0; k < strokes[i][j].coords.length; k++) {
                            if (k % 2 == 1) {
                                last = strokes[i][j].coords[k];
                                p.push(last);
                            }
                        }
                        break;
                    case 's':
                        // for each coord
                        for (k = 0; k < strokes[i][j].coords.length; k++) {
                            if (k % 2 == 1) {
                                var temp2 = strokes[i][j].coords[k];
                                last = {x: last.x + temp2.x, y: last.y + temp2.y};
                                p.push(last);
                            }
                        }
                        break;
                }
            }
            s.push({points: p});
        }
        return s;
    }

    function getStrokeEndPoints(strokes) {
        var i, j, s = [], curr;
        for (i = 0; i < strokes.length; i++) {
            curr = strokes[i];
            s.push([curr[0], curr[curr.length - 1]]);
        }
        return s;
    }

    // returns an array of ordered stroke angles
    function getAngles(strokes) {
        var i, s = strokes;
        for (i = 0; i < s.length; i++) {
            var p1 = s[i].points[0],
                p2 = s[i].points[s[i].points.length - 1];

            // SVG coordinates are flipped on y-axis so multiply y by -1
            s[i] = Math.atan2(p2.y * (-1) - p1.y * (-1), p2.x - p1.x) * 180 / Math.PI;
        }
        return s;
    }

    // adds angle property to each stroke in strokes
    function addAngles(strokes) {
        var i, s = strokes;
        for (i = 0; i < s.length; i++) {
            var p1 = s[i].points[0],
                p2 = s[i].points[s[i].points.length - 1];

            // SVG coordinates are flipped on y-axis so multiply y by -1
            s[i].angle = Math.atan2(p2.y * (-1) - p1.y * (-1), p2.x - p1.x) * 180 / Math.PI;
        }
        return s;
    }
})();